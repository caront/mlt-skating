import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import Circle from "./Circle";
import { useColors } from "../../colors";

interface ChipProps {
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
            alignItems: 'center',
            paddingHorizontal: 8,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            gap: 6,

        },
        icon: {
            backgroundColor: colors.primary,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
            width: 30,
            borderRadius: 20,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
        },
        title: {
            color: colors.grey5,
            fontSize: 18,
        },
        subTitle: {
            color: colors.grey4,
            fontSize: 16,
        }
    })
}

const Chip: React.FC<ChipProps> = ({ title, subTitle, background, icon = null, containerStyle }) => {
    const styles = useStyles();
    const hasSubTitle = subTitle !== undefined;
    const hasIcon = icon !== null && icon !== undefined;
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.icon, { display: hasIcon ? 'flex' : 'none', backgroundColor: background }]}>
                {icon}
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', paddingHorizontal: 10 }}>
                <Text style={styles.title}>{title}</Text>
                {hasSubTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
            </View>
        </View>

    );
};


export default Chip;