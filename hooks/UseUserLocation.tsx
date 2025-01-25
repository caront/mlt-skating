import React, { useEffect } from 'react';
import { Coordinate } from '../models/Rink';
import GetLocation from 'react-native-get-location'

interface UserLocationReturn {
    location: Coordinate;
    isAccesible: boolean;
    error: string;
    refresh: () => void;
}

const defaultLocation: Coordinate = {
    latitude: 45.5019,
    longitude: -73.5674,
};
const useUserLocation = (): UserLocationReturn => {
    const [coords, setCoords] = React.useState<Coordinate>(defaultLocation);
    const [isAccesible, setIsAccesible] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const getUserLocation = async () => {
        try {

            const location = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
            })
            setCoords({ latitude: location.latitude, longitude: location.longitude });
            setIsAccesible(true);

        } catch (error) {
            setError('An error occured while fetching location');
        }
    }

    useEffect(() => {
        getUserLocation();
    }, []);

    const refresh = () => {
        getUserLocation();
    }

    return {
        location: coords,
        isAccesible,
        error,
        refresh
    };
}

export default useUserLocation;