import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { CheckBox, SearchBar, Switch } from "@rneui/themed";
import { Drawer } from 'react-native-drawer-layout';
import { Icon } from '@rneui/themed';
import { useColors } from '../colors';
import DistrictSelector from './DistrictSelector';
import { getAllDistrict } from '../data/rinks';
import { Filters } from '../hooks/UseRinkFilter';
import { Button } from '@rneui/base';


interface SkyListSearchProps {
    searchProp: Filters;
    onMapSearchPressed: () => void;
    onSearchPropChanged: (searchProp: Filters) => void;
    style?: StyleProp<ViewStyle>
}

const SkyListSearch = ({ searchProp, onSearchPropChanged, style }: SkyListSearchProps) => {
    const colors = useColors();
    const [open, setOpen] = React.useState(false);

    const handleSearchTermChanged = (search: string) => {
        onSearchPropChanged({ ...searchProp, searchTerm: search });
    };

    const handleDistrictChanged = (district: string[]) => {
        onSearchPropChanged({ ...searchProp, districts: district });
    }

    return (
        <View>
            <Drawer
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                renderDrawerContent={() => {
                    return <Text>Drawer content</Text>;
                }}
            >
                <Button
                    onPress={() => setOpen((prevOpen) => !prevOpen)}
                    title={`${open ? 'Close' : 'Open'} drawer`}
                />
            </Drawer>
            <View style={[style, styles.container]}>
                <TouchableOpacity style={styles.searchParams} onPress={() => setOpen(true)}>
                    <Icon name="ice-skating" type='material' />
                    <Text>+</Text>
                </TouchableOpacity>
                <SearchBar
                    platform="ios"
                    searchIcon={<Icon name='search' />}
                    clearButtonMode='never'
                    onClear={() => console.log('clear')}
                    containerStyle={[styles.searchBarContainer]}
                    inputContainerStyle={styles.searchBarInputContainer}
                    onChangeText={handleSearchTermChanged}
                    placeholder="Search for a rink..."
                    placeholderTextColor="#888"
                    value={searchProp.searchTerm}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    searchParams: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
    params: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    searchBarContainer: {
        width: '90%',
    },
    searchBarInputContainer: {
    },
    // drawerContent: {
    //     flex: 1,
    //     padding: 20,
    //     backgroundColor: '#fff',
    // },
    // switchContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginBottom: 20,
    // },
});

export default SkyListSearch;