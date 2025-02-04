import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { useColors } from '../colors';
interface RinkCountProps {
    style: StyleProp<ViewStyle>;
}
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useRinkGroups } from '../hooks/UseRinkGroup';


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


const RinkCount: React.FC<RinkCountProps> = ({ style }) => {
    const { t } = useTranslation();
    const {rinkGroups} = useRinkGroups();
    const styles = useStyles();
    return <Text style={[style, styles.rinkNumber]}>{t('rink_number', {count: rinkGroups.length})}</Text>
}

export default RinkCount;