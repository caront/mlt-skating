
import React from 'react';

import { Condition, ConditionAndLastUpdate, ConditionLastUpdate, Rink, RinkWithCondition, RinkWithDistrictAndConditionLastUpdate } from "../../models/Rink";
import { StyleSheet, Text, View } from "react-native";
import DayJs from "dayjs";
import { useColors } from '../../colors';
import Circle from '../shared/Circle';
import { useTranslation } from 'react-i18next';
import { DateFormat } from '../../utils/dateFormat';
import dayjs from 'dayjs';

interface OpenChipsProps {
    rink: RinkWithDistrictAndConditionLastUpdate;
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
            gap: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        status: {
            fontSize: 18,
            color: colors.white
        },
        hours: {
            fontSize: 12,
            color: colors.white
        }
    })
}

const OpenChips: React.FC<OpenChipsProps> = ({ rink }) => {
    const colors = useColors();
    const styles = useStyles();
    const { t } = useTranslation();

    const today = dayjs().get('day');

    const schedule = rink.schedules[today];

    const isCurrenlyOpen = (): {
        wasOpen: boolean;
        isNowOpen: boolean;
        willBeOpen: boolean;
    } => {
        const now = dayjs();
        const opens = dayjs(schedule.opens, 'HH:mm');
        const closes = dayjs(schedule.closes, 'HH:mm');
        return {
            wasOpen: now.isAfter(closes) && now.isAfter(opens),
            isNowOpen: now.isAfter(opens) && now.isBefore(closes),
            willBeOpen: now.isBefore(opens) && now.isBefore(closes)
        }
    }

    // const color = isCurrenlyOpen().isNowOpen ? colors. : colors.success;

console.log('schedule', isCurrenlyOpen());
    return <View style={[styles.container, { backgroundColor: rink.open ? isCurrenlyOpen() ? colors.warning : colors.success : colors.error }]} >
        <Text style={styles.status} >{t(rink.open ? 'open' : 'close')}</Text>
        {<View style={styles.row} >
            <Text style={styles.hours} >{t('open_hours', { opens: schedule.opens, closes: schedule.closes })}</Text>
        </View>}
    </View>
}

export default OpenChips;