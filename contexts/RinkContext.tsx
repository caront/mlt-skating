import React, { createContext, useEffect, useReducer, useState } from "react";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { defaultCondition, Rink, RinkWithCondition } from "../models/Rink";
import { GET_RINKS } from "../graphql/RinkQueries";
import { Action, RinkSearchOption, defaultSearchOption, rinkReducer } from "../reducers/RinkReducer";
import { StringCleaner } from "../utils/stringCleaner";
import dayjs from "dayjs";
import { getFavorites, isRinkFavorite, saveFavoriteStatus } from "../utils/favoritesUtils";
import { Log } from "../utils/logs";
import { useLocates } from "../hooks/UseLocation";
import { getDistanceBetweenCoordinates } from "../utils/distance";

export type RinkContextType = {
    rinks: RinkWithCondition[];
    favRinks: RinkWithCondition[];
    loading: boolean;
    error: Error | ApolloError | undefined;
    options: RinkSearchOption;
    dispatch: React.Dispatch<Action>;
    refresh: () => void;
    resetOptions: () => void;
    setRinkFavorite: (id: number, isFav: boolean) => void;
    rinkFocus: Rink | undefined;
    setRinkFocus: (rink: Rink) => void;
};

const defaultDistritContext: RinkContextType = {
    rinks: [],
    favRinks: [],
    loading: true,
    error: undefined,
    dispatch: () => { },
    options: defaultSearchOption,
    refresh: () => { },
    resetOptions: () => { },
    setRinkFavorite: (id: number, isFav: boolean) => { },
    rinkFocus: undefined,
    setRinkFocus: (rink: Rink) => { },
};

export const RinkContext = createContext<RinkContextType>(defaultDistritContext);

const buildRinks = (rinks: any): Promise<RinkWithCondition[]> => {

    return Promise.all(rinks.map(async (rink: any): Promise<RinkWithCondition> => {
        const { id, name, type, description, districts: district, longitude, latitude, rink_name, conditionsCollection, description_fr, description_en } = rink;
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
                isFav: false,
                public_url: undefined,
                description_fr,
                description_en
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
            isFav: false,
            public_url: undefined,
            description_fr,
            description_en
        }
    }));

};

export const RinkProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { isLocationEnabled, location } = useLocates();
    const [sourceRinks, setSourceRinks] = useState<RinkWithCondition[]>([]);
    const [rinks, setRinks] = useState<RinkWithCondition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApolloError | undefined>(undefined);
    const [loadRinks] = useLazyQuery(GET_RINKS);

    const [rinkFocus, setRinkFocus] = useState<Rink | undefined>(undefined);


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

        setSourceRinks(await syncIsFavorite(await buildRinks(allRinks)));
        setLoading(false);
    };

    const syncIsFavorite = async (rinks: RinkWithCondition[]) => {
        const favorites = await getFavorites();
        rinks.forEach(async (rink: Rink) => {
            rink.isFav = rink.id in favorites;
        }
        );
        return rinks
    }

    useEffect(() => {
        fetchAllRinks();
    }, []);


    useEffect(() => {
        if (!isLocationEnabled) return;
        sourceRinks.forEach((rink) => {
            rink.distance = getDistanceBetweenCoordinates(location, rink);
        });
        setSourceRinks(sourceRinks.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0)));
    }, [location, isLocationEnabled]);

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
            setRinks(filteredRinks.sort((a, b) => a.name.localeCompare(b.name)));
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
        fetchAllRinks().then(() => Log.info("Rinks refreshed"));
    }

    const resetOptions = () => {
        dispatch({ type: "RESET_OPTIONS" });
    }

    const setRinkFav = async (id: number, isFav: boolean) => {
        saveFavoriteStatus(id, isFav).then(() =>
            syncIsFavorite(rinks).then((rinks) => setRinks(rinks))
        );
    }

    React.useEffect(() => {
        if (rinks.length === 0)
            setRinks(sourceRinks);
    }, [sourceRinks]);

    return (
        <RinkContext.Provider value={{
            rinks,
            favRinks: rinks.filter((rink) => rink.isFav),
            options,
            dispatch,
            loading,
            error,
            refresh,
            resetOptions,
            setRinkFavorite: setRinkFav,
            rinkFocus,
            setRinkFocus
        }}>
            {children}
        </RinkContext.Provider>
    );
};
