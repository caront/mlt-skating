import React, { useEffect, useState } from 'react';
import { Condition, ECondition, Rink, RinkHistory } from '../models/Rink';
import { ActivityIndicator, FlatList, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useColors } from '../colors';
import Dayjs from 'dayjs';
import { useRinkConditionsHistory } from '../hooks/UseRinkConditionsHistory';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import ConditionTimeLine from './ConditionTimeline';
import BlurContainer from './shared/BlurContainer';
import Chip from './shared/Chip';
import { Icon } from '@rneui/themed';

interface RinkHistoryListProps {
    rink: Rink;
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

    const { loading, error, conditions } = useRinkConditionsHistory(rink.id);
    const width = Dimensions.get('window').width;
    const styles = useStyles();
    const [progress, setProgress] = useState<number>(0);
    const ref = React.useRef<ICarouselInstance>(null);
    const colors = useColors();



    if (loading) {
        return <BlurContainer style={styles.container}>
            <ActivityIndicator style={{ marginVertical: 16 }} />
        </BlurContainer>
    }

    if (error) {
        return <BlurContainer style={styles.container}>
            <Text>{error.message}</Text>
        </BlurContainer>
    }

    if (conditions.length === 0) {
        return <BlurContainer style={styles.container}>
            <Text>No history</Text>
        </BlurContainer>
    }



    return (
        <BlurContainer style={styles.container}>
            <Chip title="History"
                background={colors.secondary}
                icon={<Icon name='access-time' color='white' size={15} type='material' />}
                containerStyle={{ marginVertical: 5 }} />

            <ConditionTimeLine changes={conditions} />
        </BlurContainer>
    );
}

export default RinkHistoryList;