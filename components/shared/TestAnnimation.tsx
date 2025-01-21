import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const TestAnnimation: React.FC = () => {
    const width = useSharedValue<number>(20);

    const handlePress = () => {
        width.value = withSpring(width.value + 50);
      };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
        <Animated.View
          style={{
            width,
            height: 100,
            backgroundColor: 'violet',
          }}
        />
        <Button onPress={handlePress} title="Click me" />
      </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    box: {
        height: 100,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        marginVertical: 64,
    },
});

export default TestAnnimation;