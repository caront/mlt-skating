import React, { createContext } from 'react'
import { City } from '../models/City';
import { ApolloError, useQuery } from '@apollo/client';
import { GET_CITIES } from '../graphql/CitiesQueries';

export type CityContextType = {
    cities: City[];
    loading: boolean;
    error: Error | ApolloError | undefined;
}

const defaultCityContext: CityContextType = {
    cities: [],
    loading: true,
    error: undefined
};


const buildDistricts = (districts: any) => {
    try {
        return districts?.districtsCollection.edges.map((district: any) => {
            return {
                id: district.node.id,
                name: district.node.name,
                code: district.node.code,
                latitude: district.node.latitude,
                longitude: district.node.longitude
            }
        });
    }
    catch (e) {
        console.log(e);
    }
    return [];
}

const buildCities = (cities: any) => {
    try {
        return cities?.citiesCollection.edges.map((city: any) => {
            return {
                id: city.node.id,
                name: city.node.name,
                latitude: city.node.latitude,
                longitude: city.node.longitude,
                districts: buildDistricts(city.node.districtsCollection)
            }
        });
    }
    catch (e) {
        console.log(e);
    }
    return [];
}

export const CityContext = createContext<CityContextType>(defaultCityContext);

export const CityProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { data, loading, error } = useQuery(GET_CITIES);

    const cities = buildCities(data);

    return <CityContext.Provider value={{
        cities: cities || [],
        loading,
        error
    }}>
        {children}
    </CityContext.Provider>
}
