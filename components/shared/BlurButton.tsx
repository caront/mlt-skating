import React from 'react';

import { StyleSheet, View, ButtonProps } from 'react-native';
import { Button } from '@rneui/themed'

import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { BlurView } from "@react-native-community/blur";
import { useColors } from '../../colors';
import { useTheme } from '@react-navigation/native';
import BlurContainer from './BlurContainer';


type BlurIconButtonProps = {
    height: number;
    width: number;
    blur: boolean;
    icon: {
        name: string;
        color: string;
        type: string;
    }
    onPress: () => void;
};


const BlurIconButton: React.FC<BlurIconButtonProps> = ({ height, width, icon, onPress, blur: blurEnable }) => {
    const colors = useColors();
    return (
        <BlurContainer style={[{ width, height, backgroundColor: blurEnable ? 'transparent' : colors.white }, { borderRadius: 30 }]}>
            <Button
                buttonStyle={{
                    borderRadius: 30,
                    width,
                    height,
                    backgroundColor: 'transparent',
                }}
                icon={icon}
                titleStyle={{ fontWeight: 'bold' }} onPress={onPress}
            />
        </BlurContainer>

    );
}

export default BlurIconButton;
