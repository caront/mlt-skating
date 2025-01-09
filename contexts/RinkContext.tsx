import React, { createContext, useEffect, useState } from "react";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { Rink, RinkWithDistrictAndCondition } from "../models/Rink";
import { GET_RINKS } from "../graphql/RinkQueries";

export type RinkContextType = {
    rinks: RinkWithDistrictAndCondition[];
    loading: boolean;
    error: Error | ApolloError | undefined;
};

const defaultDistritContext: RinkContextType = {
    rinks: [],
    loading: true,
    error: undefined,
};

export const RinkContext = createContext<RinkContextType>(defaultDistritContext);

const buildRinks = (rinks: any) => {
    try {
        return rinks.map((rink: any) => {
            const { id, name, type, description, districts: district, longitude, latitude, rink_name, conditionsCollection } = rink;
            const { open, condition, cleared, watered, resurfaced } = conditionsCollection.edges[0].node;
            return {
                id,
                name,
                type,
                description,
                district, longitude, latitude, rink_name,
                cleared,
                open, condition, watered, resurfaced
            }
        });
    }
    catch (e) {
        console.log(e);
    }
    return [];
};

export const RinkProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [rinks, setRinks] = useState<RinkWithDistrictAndCondition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApolloError | undefined>(undefined);
    const [loadRinks] = useLazyQuery(GET_RINKS);

    const fetchAllRinks = async () => {
        let allRinks: any[] = [];
        let hasNextPage = true;
        let after: string | null = null;

        while (hasNextPage) {
            const { data, error } = await loadRinks({
                variables: {
                    first: 30, // Number of items per page
                    after,     // Cursor for the next page
                },
            });

            if (error) {
                setError(error);
                setLoading(false);
                return;
            }

            const { edges, pageInfo } = data.rinksCollection;

            // Add current page rinks to the list
            allRinks = [...allRinks, ...edges.map((edge: any) => edge.node)];

            // Update pagination variables
            hasNextPage = pageInfo.hasNextPage;
            after = pageInfo.endCursor;
        }

        setRinks(buildRinks(allRinks));
        setLoading(false);
    };

    useEffect(() => {
        fetchAllRinks();
    }, []);

    return (
        <RinkContext.Provider value={{ rinks, loading, error }}>
            {children}
        </RinkContext.Provider>
    );
};
