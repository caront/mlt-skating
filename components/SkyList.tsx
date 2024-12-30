import React, { FunctionComponent } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Place } from '../models/Place';
import { useColors } from '../colors';

interface SkiListProps {
    places: Place[];
    onPlacePress: (place: Place) => void;
}

const SkiList: FunctionComponent<SkiListProps> = ({ places, onPlacePress }) => {
    const colors = useColors();
    return (
        <FlatList
            data={places}
            style={styles.container}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item: place }) => (

                <TouchableOpacity onPress={() => onPlacePress(place)} style={styles.card}>
                    <View style={[styles.circle, { backgroundColor: place.open ? colors.accent.emeraldGreen : colors.accent.skatingRed }]} />
                    <View style={styles.column}>
                        <Text style={styles.placeName}>{place.name}</Text>
                        <Text style={styles.condition}>{place.neibordhoods.name}</Text>
                    </View>
                </TouchableOpacity>

            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1,
        padding: 10,
    },

    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    column: {
        flexDirection: 'column',
    },
    placeName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    condition: {
        fontSize: 14,
        color: '#555',
    },
});

export default SkiList;