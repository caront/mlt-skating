import React, { FunctionComponent, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, RefreshControl, Platform } from 'react-native';
import { ECondition, Rink, RinkWithCondition } from '../../models/Rink';
import { cleanColor, conditionColor, resurfacedColor, useColors } from '../../colors';
import { useRinks } from '../../hooks/UseRinks';
import { Icon } from '@rneui/themed';
import Animated, { SharedTransition, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BlurView } from "@react-native-community/blur";
import PropertyChip from '../shared/PropertyChip';
import Circle from '../shared/Circle';
// import { isFavorite } from '../../utils/favoritesUtils';
import { Log } from '../../utils/logs';
import { useLocates } from '../../hooks/UseLocation';
import { useTranslation } from 'react-i18next';
import { useRinkGroups } from '../../hooks/UseRinkGroup';
import { RinkGroup } from '../../models/RinkGroup';
import { FlatList } from 'react-native-actions-sheet';
import LoadingFullScreen from '../shared/LoadingFullScreen';
import { FlatList as RNFlatList } from 'react-native';
import Ads from '../shared/Ads';
interface RinkListProps {
    onRinkPress: (rink: Rink) => void;
    style?: StyleProp<ViewStyle>
}

const useStyles = () => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            gap: 10,
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: colors.white,
            borderRadius: 16,
            padding: 10,
        },
        left: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'flex-start',
        },
        right: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            marginRight: 10,
            marginBottom: 10,
            color: colors.grey1,
        },
        column: {
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'flex-start',
        },
        rinkName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.grey5,
        },
        rinkNumber:
        {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.grey5,
        },
        district: {
            fontSize: 12,
            color: colors.grey5,
        },
        rinkDecription: {
            fontSize: 14,
            color: colors.grey5,
        },
        absolute: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: 8,
        },
        test: {
            position: "absolute",
            height: '2%',
            width: '100%',
            bottom: 2,
            left: 2,
            borderRadius: 10,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    });
}

const RinkGroupItemList = ({ rink, onRinkPress, index }: { rink: RinkWithCondition, onRinkPress: (rink: Rink) => void, index: number }) => {
    const { t } = useTranslation();
    const colors = useColors();
    const { isLocationEnabled } = useLocates();
    const styles = useStyles();

    const handlePress = () => {
        onRinkPress(rink);
    };

    const randomRotation = Math.floor(rink.id * 10) - 60;

    // Log.info('RinkItemList', index );

    return <View style={styles.column}>
        <Ads display={index !== 0 && index % 10 === 0} style={{ marginBottom: 16 }} />
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            {rink.isFav &&
                <View style={[styles.absolute, styles.right]}>
                    <Icon name="favorite" iconStyle={{ color: 'pink', transform: [{ rotate: `${randomRotation}deg` }], }} type='material' />
                </View>
            }
            <Text style={styles.rinkName}>{rink.name}</Text>
            <Text style={styles.rinkDecription}>{rink.description}</Text>
            <Text style={styles.district}>{rink.district.name}</Text>
            <View style={styles.row}>
                <View style={[styles.row, { gap: 5 }]}>
                    <Text>{t(rink.open ? 'open' : 'close')}</Text>
                    <Circle color={rink.open ? colors.success : colors.error} size={10} />
                </View>
                <View style={[styles.row, { gap: 5 }]}>
                    <Text>{t(`rink_details.ice_quality.${rink.condition}`)}</Text>
                    <Circle color={conditionColor(rink.condition)} size={10} />
                </View>
                {false && <View style={[styles.row, { gap: 5 }]}>
                    <Text> {rink.distance}</Text>
                    <Text>km</Text>
                </View>
                }
            </View>
        </TouchableOpacity>
    </View>

}

// const Adds: React.FC<{ show: boolean }> = ({ show }) => {
//     const colors = useColors();

//     if (show) {
//         return <View style={{ height: 55, marginBottom: 16, width: '100%', backgroundColor: colors.error }} />
//     }
//     return <View style={{ height: 0 }} />
// }

const RinkList: FunctionComponent<RinkListProps> = ({ onRinkPress, style }) => {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { rinkFocus, refresh, rinks } = useRinks();
    const flatRinkRef = useRef<RNFlatList>(null);

    const styles = useStyles();

    const onRinkListRefresh = () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        refresh();
    }

    React.useEffect(() => {
        setIsRefreshing(false);
    }, [rinks]);

    return (
        <View style={[styles.container, style]}>
            <FlatList
                data={rinks}
                ref={flatRinkRef}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRinkListRefresh}
                        colors={['grey']}
                        progressBackgroundColor={'black'}
                    />
                }
                scrollEnabled
                renderItem={({ item: rink, index }) => <RinkGroupItemList index={index} rink={rink} onRinkPress={onRinkPress} />}
            />
        </View>
    );
};


export default RinkList;