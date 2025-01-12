import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";
import { CheckBox, SearchBar, Switch, Button } from "@rneui/themed";
import { Drawer } from 'react-native-drawer-layout';
import { Icon } from '@rneui/themed';
import { useColors } from '../colors';
import DistrictSelector from './DistrictSelector';
import { getAllDistrict } from '../data/rinks';

import BottomDrawer, {
    BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';
import { useRinks } from '../hooks/UseRinks';
import { color } from '@rneui/base';



interface RinksFiltersProps {
    style?: StyleProp<ViewStyle>
}

const useStyle = () => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            color: colors.neutral.charcoal,

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.primary.snowWhite,
        },
        card: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            // justifyContent: 'flex-start',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 1,
            padding: 10,
        },
        searchBarContainer: {
            width: '80%',
            height: 40,
            borderRadius: 30,
        },
        searchBarInputContainer: {
            backgroundColor: colors.primary.snowWhite,
        },
        showOptionsButton: {
            borderRadius: 30,
            backgroundColor: colors.primary.snowWhite,
        },
        drawerContent: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
            // paddingHorizontal: 10,
            gap: 20,
        },
        resetButton: {
            backgroundColor: colors.primary.snowWhite,
            color: colors.neutral.charcoal,
            padding: 10,
            borderRadius: 10,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    });
}

const RinksFilters = ({ style }: RinksFiltersProps) => {
    const { dispatch, options, resetOptions } = useRinks();
    const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
    const styles = useStyle();
    const colors = useColors();

    const handleSearchTermChanged = (search: string) => {
        dispatch({ type: 'SEARCH_RINK_NAME', payload: search });
    };

    const handleDistrictChanged = (districts: string[]) => {
        dispatch({ type: 'SEARCH_RINK_DISTRICT', payload: districts });
    }

    const handleOnlyOpenChanged = (value: boolean) => {
        dispatch({ type: 'SEARCH_RINK_OPEN', payload: value });
    }

    return (
        <View style={style}>

            <View style={[styles.container, styles.card]}>

                <SearchBar
                    platform="ios"
                    searchIcon={<Icon name='ice-skating' type='material' />}
                    clearButtonMode='never'
                    onClear={() => console.log('clear')}
                    containerStyle={[styles.searchBarContainer]}
                    inputContainerStyle={styles.searchBarInputContainer}
                    onChangeText={handleSearchTermChanged}
                    placeholder="Search for a rink..."
                    placeholderTextColor="#888"
                    value={options.name}
                />
                <Button buttonStyle={styles.showOptionsButton}
                    icon={{
                        name: 'manage-search',
                        type: 'material',
                        color: colors.primary.midnightBlue,
                    }}
                    titleStyle={{ fontWeight: 'bold' }} onPress={() => bottomDrawerRef.current?.open()}>
                </Button>
            </View>

            <BottomDrawer ref={bottomDrawerRef}>
                <View style={styles.drawerContent}>
                    {/* <Pressable style={styles.resetButton} onPress={() => resetOptions()}><Text>Reset filters</Text></Pressable> */}
                    <View style={styles.row}>
                        <Text>Only open rinks</Text>
                        <Switch value={options.onlyOpen} onValueChange={handleOnlyOpenChanged} />
                    </View>
                    <DistrictSelector onSelect={handleDistrictChanged} />
                </View>
            </BottomDrawer>


        </View>
    );
};


export default RinksFilters;