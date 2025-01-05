import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { CheckBox, SearchBar, Switch } from "@rneui/themed";

import { Icon } from '@rneui/themed';
import { useColors } from '../colors';
import DistrictSelector from './DistrictSelector';
import { getAllDistrict } from '../data/rinks';
import { Filters } from '../hooks/UseRinkFilter';


interface SkyListSearchProps {
    searchProp: Filters;
    onMapSearchPressed: () => void;
    onSearchPropChanged: (searchProp: Filters) => void;
     style?: StyleProp<ViewStyle>
}

const SkyListSearch = ({ searchProp, onSearchPropChanged, style }: SkyListSearchProps) => {
    const colors = useColors();

    const handleSearchTermChanged = (search: string) => {
        onSearchPropChanged({ ...searchProp, searchTerm: search });
    };

    const handleDistrictChanged = (district: string[]) => {
        onSearchPropChanged({ ...searchProp, districts: district });
    }

    return (
        <View style={[style, styles.container]}>
            <View style={styles.row}>
                <SearchBar
                    platform="ios"
                    searchIcon={<Icon name="ice-skating" type='material' />}
                    clearIcon={<Icon name="close" type='material' />}
                    onClear={() => console.log('clear')}
                    containerStyle={[styles.searchBarContainer]}
                    inputContainerStyle={styles.searchBarInputContainer}
                    onChangeText={handleSearchTermChanged}
                    placeholder="Search for a rink..."
                    placeholderTextColor="#888"
                    value={searchProp.searchTerm}
                />
            </View>
            <View style={styles.params}>
                <CheckBox
                    checked={!!searchProp.open}
                    iconType="material"
                    title={'Only open rinks'}
                    checkedColor={colors.primary.midnightBlue}
                    uncheckedIcon='check-box-outline-blank'
                    checkedIcon="check-box"
                    onPress={() => onSearchPropChanged({ ...searchProp, open: !searchProp.open })}
                />
                <View style={styles.row}>
                  <DistrictSelector districts={getAllDistrict()} onSelect={handleDistrictChanged} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    params: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    searchBarContainer: {

    },
    searchBarInputContainer: {
    },
    drawerContent: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default SkyListSearch;