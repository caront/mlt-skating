import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import { useColors } from "../../colors";
import { BlurView } from "@react-native-community/blur";

interface BlurContainerProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>
    blur?: boolean;
    blurAmmonut?: number;
}

const BlurContainer: React.FC<BlurContainerProps> = ({ style, children, blurAmmonut = 10 }) => {
    const colors = useColors();
    const isDarkMode = useTheme().dark;
    return <View style={style}>
        <BlurView
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 30,
            }}
            blurType={isDarkMode ? 'dark' : 'light'}
            blurAmount={blurAmmonut}
            reducedTransparencyFallbackColor={colors.primary}
        />
        {children}
    </View>
}

export default BlurContainer;