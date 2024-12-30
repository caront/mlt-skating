import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

interface ChipProps {
    title: string;
    background?: string;
    icon?: React.ReactElement;
    containerStyle?: object;
}

const Chip: React.FC<ChipProps> = ({ title, background, icon, containerStyle }) => {
    return (
        <View style={{ ...styles.container, backgroundColor: background, ...containerStyle }}>
            {icon}
            <Text style={styles.title}>{title}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 20,
        gap: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1,
    },
    title: {
        color: 'white',
        marginLeft: 5,
    }
})

export default Chip;