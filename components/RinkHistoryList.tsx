import React from 'react';
import { Rink, RinkHistory } from '../models/Rink';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useColors } from '../colors';
import Dayjs from 'dayjs';

interface RinkHistoryListProps {
    rink: Rink;
    isLoading: boolean;
    error: string;
    history: RinkHistory[];
}

const Property: React.FunctionComponent<{ name: string, valueTrue: string, valueFalse: string, value: boolean }> = ({ name, valueTrue, valueFalse, value }) => {
    const colors = useColors();
    return (
        <View style={styles.property}>
            <Text>{name}</Text>
            <Text style={{ color:  colors.primary }}>{value ? valueTrue : valueFalse}</Text>
        </View>
    );
}

const RinkHistoryItemRender = ({ historyItem }: { historyItem: RinkHistory }) => {
    const colors = useColors();
    return (
        <View style={[styles.card, {
            backgroundColor: colors.primary,
            borderColor: historyItem.open ? colors.success : colors.error,
            borderBottomLeftRadius: 4, borderBottomRightRadius: 4,
            borderWidth: 0, borderBottomWidth: 5
        }]}>
            <Text >{Dayjs(historyItem.date).format('DD-MM-YYYY HH:mm')}</Text>
            <Property name="Open" valueTrue="Open" valueFalse="Closed" value={historyItem.open} />
            <Property name="Cleared" valueTrue="Cleared" valueFalse="Not Cleared" value={historyItem.cleared} />
            <Property name="Watered" valueTrue="Watered" valueFalse="Not Watered" value={historyItem.watered} />
            <Property name="Resurfaced" valueTrue="Resurfaced" valueFalse="Not Resurfaced" value={historyItem.resurfaced} />
        </View>
    );
}

const RinkHistoryList: React.FunctionComponent<RinkHistoryListProps> = ({ rink, isLoading, error, history }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            {isLoading && <ActivityIndicator />}
            {error && <Text>{error}</Text>}
            <FlatList
                data={history}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(item, index) => `${item.date}-${index}`}
                renderItem={({ item: rink }) => (
                    <RinkHistoryItemRender historyItem={rink} />
                )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        borderRadius: 10,
        padding: 10,
        gap: 5,
    },
    property: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    }

});

export default RinkHistoryList;