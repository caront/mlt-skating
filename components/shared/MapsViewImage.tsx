import { Button, Text } from '@rneui/base';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useColors } from '../../colors';
import { openMap } from '../../utils/openMaps';


interface MapsViewImageProps {
    label: string;
    lat: number;
    lng: number;
}

const MapsViewImage: React.FC<MapsViewImageProps> = ({ label, lat, lng }) => {
    const colors = useColors();
    const isIos = Platform.OS === 'ios';

    const handleOnMapButtonPressed = () => {
        openMap({ lat, lng, label });
    }

    return (
        <View style={[styles.container]}>
            <MapView
                style={styles.map}
                cacheEnabled
                camera={{
                    center: {
                        latitude: lat,
                        longitude: lng,
                    },
                    pitch: 0,
                    heading: 0,
                    altitude: 1500,
                    zoom: 15,
                }}
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lng,
                    }}
                />
            </MapView>
            <Button buttonStyle={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleOnMapButtonPressed} >
                <Text style={{ color: colors.grey5 }} >{isIos ? 'Open in Maps' : 'Open in Google Maps'}</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'stretch',
        justifyContent: 'flex-start',
        width: '100%',
        borderRadius: 8,
        gap: 10,
    },
    map: {
        width: '100%',
        borderRadius: 8,
        height: 150,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'stretch',
        alignItems: 'center',
        height: 40,
        borderRadius: 20,
    }
});

export default MapsViewImage;