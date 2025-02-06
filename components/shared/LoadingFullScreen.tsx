import React from 'react';

import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { useColors } from '../../colors';

interface LoadingFullScreenProps {
    loading: boolean;
}

const LoadingFullScreen = ({ loading }: LoadingFullScreenProps) => {
    const colors = useColors();

    if (!loading) {
        return null;
    }

    return <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoadingFullScreen;