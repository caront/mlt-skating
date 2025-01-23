
import React from 'react';

import { Condition, ConditionAndLastUpdate, ConditionLastUpdate, Rink, RinkWithCondition, RinkWithDistrictAndConditionLastUpdate } from "../../models/Rink";
import { StyleSheet, Text, View } from "react-native";
import DayJs from "dayjs";
import { useColors } from '../../colors';
import Circle from '../shared/Circle';

interface BigChipProps {
    title: string;
    subTitle?: string;
    background?: string;
    icon?: React.ReactElement;
    containerStyle?: object;
}

const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            borderRadius: 20,
            padding: 12,
            paddingVertical: 6,
            fontSize: 18,
            color: colors.white
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            fontSize: 18,
            color: colors.white
        },
    })
}

const BigChip: React.FC<BigChipProps> = ({ title, subTitle, background, icon = null, containerStyle }) => {
    const colors = useColors();
    const styles = useStyles();
    const hasSubTitle = subTitle !== undefined;
    const hasIcon = icon !== null && icon !== undefined;

    return <View style={[styles.container, { backgroundColor: background }]} >
        <View style={{ display: hasIcon ? 'flex' : 'none'}}>
            {icon}
        </View>
        <Text style={styles.title} >{title}</Text>
    </View>
}

export default BigChip;