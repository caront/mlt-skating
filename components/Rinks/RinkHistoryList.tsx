import React, { useEffect, useState } from 'react';
import { Condition, ConditionList, ECondition, Rink, RinkWithCondition } from '../../models/Rink';
import { ActivityIndicator, FlatList, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useColors } from '../../colors';
import Dayjs from 'dayjs';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import ConditionTimeLine from '../ConditionTimeline';
import BlurContainer from '../shared/BlurContainer';
import Chip from '../shared/Chip';
import { Icon } from '@rneui/themed';
import InformationContainer from '../shared/InformationContainer';
import { useTranslation } from 'react-i18next';

interface RinkHistoryListProps {
    rink: ConditionList;
}

const useStyles = () => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: 10,
        },
    });
}

const RinkHistoryList: React.FunctionComponent<RinkHistoryListProps> = ({ rink }) => {
    const { t } = useTranslation();
    const { conditions } = rink;
    const styles = useStyles();
    const colors = useColors();




    if (conditions.length === 0) {
        return <InformationContainer style={styles.container}>
            <Text>No history</Text>
        </InformationContainer>
    }

    return (
        <InformationContainer
            title={t('history')}
            titleIcon={<Icon name='access-time' color={colors.grey0} size={20} type='material' />}
            style={styles.container}>
            <ConditionTimeLine conditions={conditions} />
        </InformationContainer>
    );
}

export default RinkHistoryList;