import React from 'react';

import { StyleSheet, View, ButtonProps, StyleProp, ViewStyle } from 'react-native';

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
    annimation?: boolean;
}

const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            padding: 8,
            paddingVertical: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 10,
            backgroundColor: colors.white,
            borderRadius: 20,
        }
    })
}

const InformationContainer: React.FC<InfromationContainerProps> = ({ style, children, titleIcon = undefined, title, titleBackground, annimation = true }) => {
    const styles = useStyles();
    const colors = useColors();
    return (
        <View style={[styles.container, style]}>
            <BigChip
                title={title ? title : ''}
                icon={titleIcon}
                background={colors.secondary}
            />
            {children}
        </View>
    );
}

export default InformationContainer;