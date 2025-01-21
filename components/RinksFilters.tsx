import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextInput } from "react-native";
import { CheckBox, Switch, Button } from "@rneui/themed";
import { Drawer } from 'react-native-drawer-layout';
import { Icon } from '@rneui/themed';
import { useColors } from '../colors';
import DistrictSelector from './DistrictSelector';
import { getAllDistrict } from '../data/rinks';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import BottomDrawer, {
    BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';
import { useRinks } from '../hooks/UseRinks';
import { color } from '@rneui/base';
import SearchBar from './shared/SearchBar';
import BlurIconButton from './shared/BlurButton';



interface RinksFiltersProps {
    style?: StyleProp<ViewStyle>
    isMapVisible: boolean;
}

const useStyle = () => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            color: colors.grey5,
            marginHorizontal: 10,
            display: 'flex',
            borderRadius: 40,
            gap: 10,
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'space-between',
        },
        drawerContent: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
            gap: 20,
        },
        resetButton: {
            backgroundColor: colors.primary,
            color: colors.grey5,
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

const RinksFilters = ({ style, isMapVisible }: RinksFiltersProps) => {
    const { dispatch, options, resetOptions } = useRinks();
    const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
    const styles = useStyle();
    const colors = useColors();

    const handleSearchTermChanged = (search: string) => {
        dispatch({ type: 'SEARCH_RINK_NAME', payload: search });
    };

    const handleDistrictChanged = (districts: number[]) => {
        dispatch({ type: 'SEARCH_RINK_DISTRICT', payload: districts });
    }

    const handleOnlyOpenChanged = (value: boolean) => {
        dispatch({ type: 'SEARCH_RINK_OPEN', payload: value });
    }

    const handleOnlyFavoriteChanged = (value: boolean) => {
        dispatch({ type: 'SEARCH_FAVORITE', payload: value });
    }


    return (
        <View style={style} >
            <View style={[styles.container, { backgroundColor: isMapVisible ? 'transparent' : colors.white }]}>
                <SearchBar
                    blur={true}
                    value={options.name}
                    onChangeText={handleSearchTermChanged}
                    placeholder="Search for a rink..."
                />
                <BlurIconButton
                    blur={true}
                    height={55}
                    width={55}
                    icon={{
                        name: 'manage-search',
                        type: 'material',
                        color: colors.grey5,
                    }}
                    onPress={() => bottomDrawerRef.current?.open()} />
            </View>

            <BottomDrawer ref={bottomDrawerRef}>
                <View style={styles.drawerContent}>
                    <View style={styles.row}>
                        <Text>Only open rinks</Text>
                        <Switch value={options.onlyOpen} onValueChange={handleOnlyOpenChanged} />
                    </View>
                    <View style={styles.row}>
                        <Text>Only favorites rinks</Text>
                        <Switch value={options.onlyFavorite} onValueChange={handleOnlyFavoriteChanged} />
                    </View>
                    <DistrictSelector onSelect={handleDistrictChanged} />
                </View>
            </BottomDrawer>

        </View>
    );
};


export default RinksFilters;