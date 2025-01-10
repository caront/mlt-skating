import React, { createContext, useEffect, useReducer, useState } from "react";
import { District } from "../models/Rink";
import { ApolloError, useQuery } from "@apollo/client";
import { GET_DISTRICTS } from "../graphql/DistrictQueries";

export type DistrictContextType = {
    districts: District[];
    loading: boolean;
    error: Error | ApolloError | undefined;
    getDistrict: (id: string) => District | undefined;
};

const defaultDistritContext: DistrictContextType = {
    districts: [],
    loading: true,
    error: undefined,
    getDistrict: () => undefined
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

export const DistrictContext = createContext<DistrictContextType>(defaultDistritContext);

export const DistrictProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const { data, loading, error } = useQuery(GET_DISTRICTS);

    const districts = buildDistricts(data);

    const getDistrict = (id: string) => {
        return districts?.find((district: District) => district.id === id);
    }

    return <DistrictContext.Provider value={{
        districts: districts || [],
        loading,
        error,
        getDistrict
    }}>
        {children}
    </DistrictContext.Provider>
}
