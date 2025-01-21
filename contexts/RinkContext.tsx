import React, { createContext, useEffect, useReducer, useState } from "react";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { defaultCondition, Rink, RinkWithCondition } from "../models/Rink";
import { GET_RINKS } from "../graphql/RinkQueries";
import { Action, RinkSearchOption, defaultSearchOption, rinkReducer } from "../reducers/RinkReducer";
import { StringCleaner } from "../utils/stringCleaner";
import dayjs from "dayjs";
import { getFavorites, isFavorite, saveFavoriteStatus } from "../utils/favoritesUtils";

export type RinkContextType = {
    rinks: RinkWithCondition[];
    loading: boolean;
    error: Error | ApolloError | undefined;
    options: RinkSearchOption;
    dispatch: React.Dispatch<Action>;
    refresh: () => void;
    resetOptions: () => void;
    setRinkFavorite: (id: number, isFav: boolean) => void;
};

const defaultDistritContext: RinkContextType = {
    rinks: [],
    loading: true,
    error: undefined,
    dispatch: () => { },
    options: defaultSearchOption,
    refresh: () => { },
    resetOptions: () => { },
    setRinkFavorite: (id: number, isFav: boolean) => { }
};

export const RinkContext = createContext<RinkContextType>(defaultDistritContext);

const buildRinks = (rinks: any): Promise<RinkWithCondition[]> => {

    return Promise.all(rinks.map(async (rink: any): Promise<RinkWithCondition> => {
        const { id, name, type, description, districts: district, longitude, latitude, rink_name, conditionsCollection } = rink;
        const isFav = await isFavorite(id);
        if (conditionsCollection.edges.length === 0) {
            return {
                ...defaultCondition,
                id,
                name,
                type,
                description,
                district,
                longitude,
                latitude,
                rink_name,
                lastUpdate: new Date().toISOString(),
                isFav
            }
        }

        const { open, condition, cleared, watered, resurfaced, updated_at } = conditionsCollection.edges[0].node;

        return {
            id,
            name,
            type,
            description,
            lastUpdate: updated_at,
            updatedAt: updated_at,
            district,
            longitude,
            latitude,
            rink_name,
            cleared,
            open,
            condition,
            watered,
            resurfaced,
            isFav
        }
    }));

};

export const RinkProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [sourceRinks, setSourceRinks] = useState<RinkWithCondition[]>([]);
    const [rinks, setRinks] = useState<RinkWithCondition[]>([]);
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
        setSourceRinks(await buildRinks(allRinks));
        setLoading(false);
    };

    useEffect(() => {
        fetchAllRinks();
    }, []);

    const filters = async () => {
        setLoading(true);
        try {
            let filteredRinks = sourceRinks;
            if (options.onlyOpen) {
                filteredRinks = filteredRinks.filter((rink) => rink.open);
            }
            if (options.name !== '') {
                filteredRinks = filteredRinks.filter((rink) =>
                    StringCleaner(rink.name).toUpperCase().includes(StringCleaner(options.name as string).toUpperCase())
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
            if (options.onlyFavorite === true) {
                const favoriteRinks = await getFavorites();
                filteredRinks = filteredRinks.filter((rink) => rink.id in favoriteRinks);
            }
            setRinks(filteredRinks);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (sourceRinks.length === 0 || loading) return;
        filters();
    }, [options, sourceRinks]);


    const refresh = () => {
        fetchAllRinks();
    }

    const resetOptions = () => {
        dispatch({ type: "RESET_OPTIONS" });
    }

    const setRinkFav = async (id: number, isFav: boolean) => {
        const rinkIndex = rinks.findIndex((rink) => rink.id === id);
        if (rinkIndex === -1) {
            return;
        }
        saveFavoriteStatus(id, isFav);
        const newRinks = [...rinks];
        newRinks[rinkIndex].isFav = isFav;
        setRinks(newRinks);
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
            resetOptions,
            setRinkFavorite: setRinkFav
        }}>
            {children}
        </RinkContext.Provider>
    );
};
