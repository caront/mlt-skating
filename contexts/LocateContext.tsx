import React, { createContext, useEffect, useReducer, useState } from "react";
import { Coordinate } from "../models/Rink";
import GetLocation from "react-native-get-location";

export type LocateContextType = {
    refresh: () => void;
    loading: boolean;
    error: string | null;
    isLocationEnabled: boolean;
    location: Coordinate
}


const defaultLocation: Coordinate = {
    latitude: 45.5019,
    longitude: -73.5674,
};

const defaultLocate: LocateContextType = {
    refresh: () => { },
    loading: true,
    error: null,
    isLocationEnabled: false,
    location: defaultLocation
};

export const LocateContext = createContext<LocateContextType>(defaultLocate);

export const LocateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const [coords, setCoords] = React.useState<Coordinate>(defaultLocation);
    const [isLocationEnabled, setIsLocationEnabled] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    const getUserLocation = async () => {
        try {
            const location = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
            })
            setCoords({ latitude: location.latitude, longitude: location.longitude });
            setIsLocationEnabled(true);
            setLoading(false);
        } catch (error) {
            setError('An error occured while fetching location');
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserLocation();
    }, []);

    const refresh = () => {
        getUserLocation();
    }

    return <LocateContext.Provider value={{
        refresh,
        loading,
        error,
        isLocationEnabled,
        location: coords
    }}>
        {children}
    </LocateContext.Provider>
}