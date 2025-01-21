import React from 'react';
import DayJs from "dayjs";
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../colors';

const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
        },
        lastUpdate: {
            fontSize: 12,
            color: 'grey',
        },
        propertyContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 5,
            color: colors.grey5,
            padding: 10,
        }
    });
}


const LastUpdate: React.FC<{ date: string }> = ({ date }) => {
    const lastUpdate = DayJs(date);
    const isLastUpdateToday = lastUpdate.isSame(DayJs(), 'day');
    const styles = useStyles();

    return <View style={[styles.row]}>
        <Text style={styles.lastUpdate}>last updated {lastUpdate.format(isLastUpdateToday ? 'HH:mm' : 'YYYY-DD-MM HH:mm')}</Text>
    </View>

}

export default LastUpdate;