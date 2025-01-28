import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextInput } from "react-native";
import { CheckBox, Switch, Button } from "@rneui/themed";
import { useColors } from '../colors';
import DistrictSelector from './DistrictSelector';
import BottomDrawer, {
    BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';
import { useRinks } from '../hooks/UseRinks';
import { color } from '@rneui/base';
import SearchBar from './shared/SearchBar';
import BlurIconButton from './shared/BlurButton';
import ButtonIcon from './shared/ButtonIcon';
import { useLocates } from '../hooks/UseLocation';
import Animated, { SlideInUp, SlideOutUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Log } from '../utils/logs';



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
            backgroundColor: colors.white,
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'space-between',
        },
        drawerContent: {
            flex: 1,
            margin: 10,
            padding: 20,
            display: 'flex',
            borderRadius: 30,
            backgroundColor: colors.white,
            gap: 20,
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
    const { dispatch, options, resetOptions, refresh: refreshRinks } = useRinks();
    const { isLocationEnabled, refresh: refreshLocation } = useLocates();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const styles = useStyle();
    const colors = useColors();
    const scale = useSharedValue<number>(0);

    // useEffect(() => {
    //     scale.value = isDrawerVisible ? withSpring(1) : withSpring(0);
    // }, [isDrawerVisible]);

    const handleSearchParamButtonClicked = () => {
        console.log('handleSearchParamButtonClicked', { isDrawerVisible });
        setIsDrawerVisible(!isDrawerVisible);
    }

    // const animatedStyles = useAnimatedStyle(() => ({
    //     transform: [{ scaleY: scale.value }],
    // }));

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

    const handleRefrehLocation = () => {
        refreshLocation()
    }

    return (
        <View style={style}>
            {isDrawerVisible && <Animated.View style={[{ position: 'absolute', top: 55, right: 0 }]} entering={SlideInUp} exiting={SlideOutUp}>
                <View style={styles.drawerContent}>
                    <View style={styles.row}>
                        <Text>Only open rinks</Text>
                        <Switch value={options.onlyOpen} onValueChange={handleOnlyOpenChanged} />
                    </View>
                    <DistrictSelector onSelect={handleDistrictChanged} />
                </View>
            </Animated.View>
            }
            <View style={[styles.container]}>
                <ButtonIcon
                    height={55}
                    width={55}
                    icon={{
                        name: 'locate',
                        type: 'ionicon',
                        color: colors.grey5,
                    }}
                    onPress={handleRefrehLocation} />
                <SearchBar
                    value={options.name}
                    onChangeText={handleSearchTermChanged}
                    placeholder="Search for a rink..."
                />
                <ButtonIcon
                    height={55}
                    width={55}
                    icon={{
                        name: 'manage-search',
                        type: 'material',
                        color: colors.grey5,
                    }}
                    onPress={handleSearchParamButtonClicked} />
            </View>




        </View>
    );
};


export default RinksFilters;
