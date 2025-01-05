import React, { useEffect } from 'react';
import { Coordinate } from '../models/Rink';
import { check, PERMISSIONS } from 'react-native-permissions';

interface UserLocationReturn {
    coords: Coordinate;
    isAccesible: boolean;
    error: string;
}
const UseUserLocation = (): UserLocationReturn => {
    const [coords, setCoords] = React.useState<Coordinate>({ latitude: 0, longitude: 0 });
    const [isAccesible, setIsAccesible] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');


    useEffect(() => {
        const getUserLocation = async () => {
            try {
                const status = await check(PERMISSIONS.IOS.CAMERA);
                if (status !== 'granted') {
                    setError('Permission to access location was denied');
                    return;
                }

                // if (status === 'blocked') {
                //     setError('Permission to access location is blocked');
                //     return;
                // }

                // const location = await Location.getCurrentPositionAsync({});
                // setCoords({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                setIsAccesible(true);
            } catch (error) {
                setError('An error occured while fetching location');
            }
        }
    }, []);

    return {
        coords,
        isAccesible,
        error
    };
}