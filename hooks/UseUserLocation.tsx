import React, { useEffect } from 'react';
import { Coordinate } from '../models/Rink';
import GetLocation from 'react-native-get-location'

interface UserLocationReturn {
    location: Coordinate;
    isAccesible: boolean;
    error: string;
}
const useUserLocation = (): UserLocationReturn => {
    const [coords, setCoords] = React.useState<Coordinate>({ latitude: 0, longitude: 0 });
    const [isAccesible, setIsAccesible] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');


    useEffect(() => {
        const getUserLocation = async () => {
            try {

                const location = await GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 60000,
                })

                console.log(location);
                setCoords({ latitude: location.latitude, longitude: location.longitude });
                setIsAccesible(true);

            } catch (error) {
                setError('An error occured while fetching location');
            }
        }
        getUserLocation();
    }, []);

    return {
        location: coords,
        isAccesible,
        error
    };
}

export default useUserLocation;