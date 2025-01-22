
import React from 'react';

import { Condition, ConditionAndLastUpdate, ConditionLastUpdate, Rink, RinkWithCondition, RinkWithDistrictAndConditionLastUpdate } from "../../models/Rink";
import { StyleSheet, Text, View } from "react-native";
import DayJs from "dayjs";
import { useColors } from '../../colors';
import Circle from '../shared/Circle';

interface OpenChipsProps {
    conditions: ConditionAndLastUpdate;
}

const useStyles = () => {
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    })
}

const OpenChips: React.FC<OpenChipsProps> = ({ conditions }) => {
    const colors = useColors();
    const styles = useStyles();

    return <View style={styles.container} >

        <View style={[styles.row, { gap: 5, justifyContent: 'flex-start' }]}>
            <Text style={{ fontSize: 20 }} >{conditions.open ? 'Open' : 'Close'}</Text>
            <Circle color={conditions.open ? colors.success : colors.error} size={15} />
        </View>
        <Text style={{ fontSize: 12, color: colors.grey4 }}>Since {DayJs(conditions.openSince).format('YYYY-MM-DD HH:mm')}</Text>
    </View>
}

export default OpenChips;