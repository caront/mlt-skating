
import React from 'react';

import { Condition, ConditionAndLastUpdate, ConditionLastUpdate, Rink, RinkWithCondition, RinkWithDistrictAndConditionLastUpdate } from "../../models/Rink";
import { StyleSheet, Text, View } from "react-native";
import DayJs from "dayjs";
import { useColors } from '../../colors';
import Circle from '../shared/Circle';
import { useTranslation } from 'react-i18next';
import { DateFormat } from '../../utils/dateFormat';

interface OpenChipsProps {
    condition: ConditionAndLastUpdate;
}

const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            alignItems: 'center',
            borderRadius: 20,
            padding: 12,
            fontSize: 18,
            color: colors.white
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        status: {
            fontSize: 18,
            color: colors.white
        },
    })
}

const OpenChips: React.FC<OpenChipsProps> = ({ condition }) => {
    const colors = useColors();
    const styles = useStyles();
    const { t } = useTranslation();

    return <View style={[styles.container, { backgroundColor: condition.open ? colors.success : colors.error }]} >
        <Text style={styles.status} >{t(condition.open ? 'open' : 'close')}</Text>
        <Text style={{ fontSize: 12, color: colors.white }}>{t('since', { date: DateFormat(condition.openSince) })}</Text>
    </View>
}

export default OpenChips;