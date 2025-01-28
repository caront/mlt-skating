import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { useColors } from '../colors';
import { useRinks } from '../hooks/UseRinks';
import { Log } from '../utils/logs';
import { Rink } from '../models/Rink';

interface RinkCountProps {
    style: StyleProp<ViewStyle>;
    rinks: Rink[];
}
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        rinkNumber: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.grey5,
        }
    });
}


const RinkCount: React.FC<RinkCountProps> = ({ style, rinks }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    return <Text style={[style, styles.rinkNumber]}>{t('rink_number', {count: rinks.length})}</Text>
}

export default RinkCount;