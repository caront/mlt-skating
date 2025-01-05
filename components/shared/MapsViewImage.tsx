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
        <View style={[styles.container, { backgroundColor: colors.primary.snowWhite }]}>
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
            <Button buttonStyle={[styles.button, {backgroundColor: colors.primary.midnightBlue}]} 
            onPress={handleOnMapButtonPressed} >
                    <Text style={{color: colors.primary.snowWhite}} >{isIos ? 'Open in Maps' : 'Open in Google Maps'}</Text>
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
        backgroundColor: '#fff',
        borderRadius: 8,
        gap: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 1,
        padding: 10,
    },
    map: {
        width: '100%',
        height: 100,
    },
    button: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'stretch',
        alignItems: 'center',
        // padding: 10,
        height: 40,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1,
    }
});

export default MapsViewImage;