import React, { FunctionComponent } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, RefreshControl } from 'react-native';
import { Rink, RinkWithDistrictAndCondition } from '../models/Rink';
import { useColors } from '../colors';

interface SkiListProps {
    rinks: RinkWithDistrictAndCondition[];
    onRinkPress: (rink: RinkWithDistrictAndCondition) => void;
    style?: StyleProp<ViewStyle>
    onRinkListRefresh: () => void;
    isRefreshing: boolean;
}

const SkiList: FunctionComponent<SkiListProps> = ({ rinks, onRinkPress, style, onRinkListRefresh, isRefreshing }) => {
    const colors = useColors();
    return (
        <FlatList
            data={rinks}
            style={[style, styles.container]}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            keyExtractor={(item) => item.id}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRinkListRefresh}
                    colors={['grey']}
                    progressBackgroundColor={'black'}
                />
            }
            renderItem={({ item: rink }) => (
                <TouchableOpacity onPress={() => onRinkPress(rink)} style={styles.card}>
                    <View style={[styles.circle, { backgroundColor: rink.open ? colors.accent.emeraldGreen : colors.accent.skatingRed }]} />
                    <View style={styles.column}>
                        <Text style={styles.rinkName}>{rink.name}</Text>
                        <Text style={styles.condition}>{rink.district.name}</Text>
                    </View>
                </TouchableOpacity>

            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1,
        padding: 10,
    },

    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    column: {
        flexDirection: 'column',
    },
    rinkName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    condition: {
        fontSize: 14,
        color: '#555',
    },
});

export default SkiList;