import React from "react";
import { StyleSheet, View } from "react-native";

const Circle = ({ color, size }: { color: string, size: number }) => {
    return <View style={[styles.circle, { backgroundColor: color, height: size, width: size }]} />
};


const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
});

export default Circle;