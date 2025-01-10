import React, { createContext, useEffect, useReducer, useState } from "react";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { Rink, RinkWithDistrictAndCondition } from "../models/Rink";
import { GET_RINKS } from "../graphql/RinkQueries";
import { Action, RinkSearchOption, defaultSearchOption, rinkReducer } from "../reducers/RinkReducer";
import { StringCleaner } from "../utils/stringCleaner";

export type RinkContextType = {
    rinks: RinkWithDistrictAndCondition[];
    loading: boolean;
    error: Error | ApolloError | undefined;
    options: RinkSearchOption;
    dispatch: React.Dispatch<Action>;
    refresh: () => void;
    resetOptions: () => void;
};

const defaultDistritContext: RinkContextType = {
    rinks: [],
    loading: true,
    error: undefined,
    dispatch: () => { },
    options: defaultSearchOption,
    refresh: () => { },
    resetOptions: () => { }
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
    const [sourceRinks, setSourceRinks] = useState<RinkWithDistrictAndCondition[]>([]);
    const [rinks, setRinks] = useState<RinkWithDistrictAndCondition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApolloError | undefined>(undefined);
    const [loadRinks] = useLazyQuery(GET_RINKS);


    const [options, dispatch] = useReducer(
        rinkReducer,
        defaultSearchOption)

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

        setSourceRinks(buildRinks(allRinks));
        setLoading(false);
    };

    useEffect(() => {
        fetchAllRinks();
    }, []);

    React.useEffect(() => {
        let filteredRinks = sourceRinks;
        if (options.onlyOpen) {
            filteredRinks = filteredRinks.filter((rink) => rink.open);
        }
        if (options.name !== '') {
            filteredRinks = filteredRinks.filter((rink) =>
                StringCleaner(rink.name).includes(StringCleaner(options.name as string))
            );
        }
        if (options.districts !== undefined && options.districts.length > 0) {
            filteredRinks = filteredRinks.filter((rink) => {
                if (options.districts === undefined)
                    return true;
                return options.districts.includes(rink.district.id);
            }

            );
        }
        if (options.conditions !== undefined && options.conditions.length > 0) {
            filteredRinks = filteredRinks.filter((rink) => {
                if (options.conditions === undefined)
                    return true;
                return options.conditions.includes(rink.condition);
            });
        }
        setRinks(filteredRinks);
    }, [options]);


    const refresh = () => {
        fetchAllRinks();
    }


    const resetOptions = () => {
        dispatch({ type: "RESET_OPTIONS" });
    }

    React.useEffect(() => {
        if (rinks.length === 0)
            setRinks(sourceRinks);
    }, [sourceRinks]);

    return (
        <RinkContext.Provider value={{
            rinks,
            options,
            dispatch,
            loading,
            error,
            refresh,
            resetOptions
        }}>
            {children}
        </RinkContext.Provider>
    );
};
