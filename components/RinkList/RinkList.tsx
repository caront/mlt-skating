import React, { FunctionComponent, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, RefreshControl, Platform } from 'react-native';
import { ECondition, Rink, RinkWithCondition } from '../../models/Rink';
import { cleanColor, conditionColor, resurfacedColor, useColors } from '../../colors';
import { useRinks } from '../../hooks/UseRinks';
import { Icon } from '@rneui/themed';
import Animated, { SharedTransition, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BlurView } from "@react-native-community/blur";
import PropertyChip from '../shared/PropertyChip';
import Circle from '../shared/Circle';
import { isFavorite } from '../../utils/favoritesUtils';
import { Log } from '../../utils/logs';
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
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 1,
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

const RinkItemList = ({ rink, onRinkPress }: { rink: RinkWithCondition, onRinkPress: (rink: Rink) => void }) => {
    const colors = useColors();
    const styles = useStyles();

    const handlePress = () => {
        onRinkPress(rink)
    };

    const randomRotation = Math.floor(rink.id * 10) - 60;

    return <TouchableOpacity onPress={handlePress} style={styles.card}>
        {rink.isFav &&
            <View style={[styles.absolute, styles.right]}>
                <Icon name="favorite" iconStyle={{ color: 'pink', transform: [{rotate: `${randomRotation}deg`}], }} type='material' />
            </View>
        }
        <Text style={styles.rinkName}>{rink.name}</Text>
        <Text style={styles.rinkDecription}>{rink.description}</Text>
        <Text style={styles.district}>{rink.district.name}</Text>
        <View style={styles.row}>
            <View style={[styles.row, { gap: 5 }]}>
                <Text>Open</Text>
                <Circle color={rink.open ? colors.success : colors.error} size={10} />
            </View>
            <View style={[styles.row, { gap: 5 }]}>
                <Text>Ice condition</Text>
                <Circle color={conditionColor(rink.condition)} size={10} />
            </View>
        </View>
    </TouchableOpacity>
}

const RinkList: FunctionComponent<RinkListProps> = ({ onRinkPress, style }) => {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { rinks, refresh } = useRinks();

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
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRinkListRefresh}
                        colors={['grey']}
                        progressBackgroundColor={'black'}
                    />
                }
                renderItem={({ item: rink }) => <RinkItemList rink={rink} onRinkPress={onRinkPress} />}
            />
        </View>
    );
};


export default RinkList;