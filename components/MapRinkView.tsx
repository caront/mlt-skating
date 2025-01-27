import React, { useEffect, useRef } from 'react';
import { Rink } from '../models/Rink';
import MapView, { Circle, Marker } from 'react-native-maps';
import { useColors } from '../colors';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { useRinks } from '../hooks/UseRinks';
import { Log } from '../utils/logs';
import { Button } from '@rneui/themed';
import { useLocates } from '../hooks/UseLocation';

interface MapRinkViewProps {
    onRinkPress: (rink: Rink) => void;
    style?: StyleProp<ViewStyle>
}

const useStyle = () => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            display: 'flex',
            width: '100%',
            height: '100%',
        },
        map: {
            flex: 1,
            width: '100%',
            height: '100%',
        },
    });
}

//45.5019° N, 73.5674° W

const MapRinkView: React.FC<MapRinkViewProps> = ({ onRinkPress, style }) => {
    const { rinks } = useRinks();
    const { location, isLocationEnabled } = useLocates();
    const mapRef = useRef<MapView>(null);
    const styles = useStyle();
    const colors = useColors();

    useEffect(() => {
        if (mapRef.current && location) {
            Log.debug("Animating to region");
            mapRef.current.animateToRegion({
                ...location,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000);
        }
    }, [location])

    return (
        <>
            <MapView
                ref={mapRef}
                loadingEnabled={true}
                onMapLoaded={() => Log.debug("Map loaded")}
                onMapReady={() => Log.debug("Map ready")}
                style={[style, styles.map]}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {isLocationEnabled && <Circle
                    center={location}
                    radius={100}
                    strokeWidth={3}
                    fillColor={colors.primary}
                    strokeColor={colors.secondary}
                />}

                {rinks.map((rink, idx) => {
                    return <Marker
                        key={idx}
                        pinColor={rink.open ? colors.success : colors.error}
                        coordinate={rink}
                        onPress={() => onRinkPress(rink)}
                        id={idx.toString()}
                    />
                })}
            </MapView >
        </>
    );
};


export default MapRinkView;