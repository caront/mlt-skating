import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleProp, ViewStyle, View, Platform, StyleSheet } from "react-native";
import { useColors } from "../../colors";
import { BlurView } from "@react-native-community/blur";

interface BlurContainerProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>
    blur?: boolean;
    blurAmount?: number;
}

const useStyles = (blur: boolean) => {
    const colors = useColors();
    const isAndroid = Platform.OS === 'android';

    return StyleSheet.create({
        container: {
            backgroundColor: isAndroid ? colors.white : 'transparent',
            borderRadius: 30,
        },
        blur: {
            display: isAndroid || !blur ? 'none' : 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 30,
        },
        clearIcon: {
            flex: 4,
            color: colors.grey5,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"
        }
    });
}

const BlurContainer: React.FC<BlurContainerProps> = ({ style, blur = true, children, blurAmount = 10 }) => {
    const colors = useColors();
    const isDarkMode = useTheme().dark;
    const styles = useStyles(blur);
    return <View style={[style, styles.container]}>
        <BlurView
            style={styles.blur}
            blurType={isDarkMode ? 'dark' : 'light'}
            blurAmount={blurAmount}
            reducedTransparencyFallbackColor={colors.primary}
        />
        {children}
    </View>
}

export default BlurContainer;