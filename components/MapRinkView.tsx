import React from 'react';
import { Rink, RinkWithDistrictAndCondition } from '../models/Rink';
import MapView, { Marker } from 'react-native-maps';
import { useColors } from '../colors';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { View } from 'react-native';

interface MapRinkViewProps {
    rinks: RinkWithDistrictAndCondition[];
    onRinkPress: (rink: RinkWithDistrictAndCondition) => void;
    style?: StyleProp<ViewStyle>
}

const useStyle = () => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: colors.neutral.steelGray,
        },
        map: {
            width: '100%',
            flex: 1,
            height: '100%',
        },
    });
}

//45.5019° N, 73.5674° W

const MapRinkView: React.FC<MapRinkViewProps> = ({ rinks, onRinkPress, style }) => {
    const styles = useStyle();
    return (
        <MapView
            style={[style, styles.map]}
            initialRegion={{
                latitude: 45.5019,
                longitude: -73.5674,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {rinks.map((rink, idx) => (
                <Marker
                    key={idx}
                    coordinate={rink.coordinates}
                    onPress={() => onRinkPress(rink)}
                />
            ))}
        </MapView>
    );
};


export default MapRinkView;