import React from 'react';

import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface SwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    trueIcon: React.ReactElement;
    falseIcon: React.ReactElement;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, trueIcon, falseIcon }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onValueChange(!value)}>
                <View style={styles.leftContainer}>
                    {trueIcon}
                </View>
                <View style={styles.rightContainer}>
                    {falseIcon}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
    },
    leftContainer: {

    },
    rightContainer: {

    }
});