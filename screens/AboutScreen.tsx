import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useColors } from '../colors';

const useStyles = () => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.grey5,
            marginBottom: 20,
        },
        text: {
            fontSize: 16,
            color: colors.grey5,
            marginBottom: 20,
        },
    });
}


const AboutScreen = () => {
    const colors = useColors();
    const styles = useStyles();


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.text}>This is a simple app to help you find the nearest ice rinks.</Text>
            <Text style={styles.text}>I hope you enjoy it!</Text>
        </SafeAreaView>
    );
}

export default AboutScreen;