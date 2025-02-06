import React from 'react';

import { StyleSheet, View, ButtonProps, StyleProp, ViewStyle, Text } from 'react-native';

import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { useColors } from '../../colors';
import Chip from './Chip';
import BlurContainer from './BlurContainer';
import BigChip from './BigChip';

interface InfromationContainerProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>
    titleIcon?: React.ReactElement;
    title?: string;
    titleBackground?: string;
}

const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 10,
            backgroundColor: colors.white,
            borderRadius: 24,
        },
        titleContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            borderRadius: 16,
            padding: 12,
            fontSize: 18,
            color: colors.grey0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,

        },
        title: {
            fontSize: 18,
            color: colors.grey0,
        },
    })
}

const InformationContainer: React.FC<InfromationContainerProps> = ({ style, children, titleIcon, title, titleBackground }) => {
    const styles = useStyles();
    const colors = useColors();
    return (
        <View style={[styles.container, style]}>
            <View style={[styles.titleContainer, { backgroundColor: titleBackground ?? colors.secondary }]} >
                {titleIcon}
                <Text style={styles.title} >{title}</Text>
            </View>
            {children}
        </View>
    );
}

export default InformationContainer;