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
import { supabase } from "../supabase";
import { PostgrestError } from "@supabase/supabase-js";

export type RinkContextType = {
    rinks: RinkWithCondition[];
    favRinks: RinkWithCondition[];
    loading: boolean;
    error: Error | ApolloError | PostgrestError | undefined;
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

const buildRinks = async (rawRinks: any): Promise<RinkWithCondition[]> => {

    const rinks = await Promise.all(rawRinks.map(async (rink: any): Promise<RinkWithCondition | null> => {
        const { is_active, id, name, type, description, districts: district, longitude, latitude, rink_name, conditionsCollection, description_fr, description_en } = rink;
        if (!is_active) {
            return null;
        }
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
    return rinks.filter((rink) => rink !== null) as RinkWithCondition[];
};

const fetchRinks = async (search: RinkSearchOption): Promise<RinkWithCondition[]> => {
    const { name, location: { longitude, latitude }, onlyFavorite } = search;
    const { data, error } = await supabase.rpc('search_rinks', {
        q: name,
        longitude_search: longitude,
        latitude_search: latitude
    });

    if (error) {
        throw error;
    }

    const rinks = await Promise.all(data.map(async (rink: any): Promise<RinkWithCondition> => {
        const isFav = await isRinkFavorite(rink.id);
        const { conditions, district_name } = rink;
        return {
            ...rink,
            ...conditions,
            condition: conditions.ice_condition,
            isFav,
            district: {
                name: district_name
            },
        }
    }));
    return rinks.filter((rink) => !onlyFavorite || rink.isFav);
};

export const RinkProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [rinks, setRinks] = useState<RinkWithCondition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | ApolloError | PostgrestError | undefined>(undefined);

    const [rinkFocus, setRinkFocus] = useState<Rink | undefined>(undefined);

    const [options, dispatch] = useReducer(
        rinkReducer,
        defaultSearchOption)

    const syncIsFavorite = async (rinks: RinkWithCondition[]) => {
        const favorites = await getFavorites();
        rinks.forEach(async (rink: Rink) => {
            rink.isFav = rink.id in favorites;
        }
        );
        return rinks
    }

    React.useEffect(() => {
        fetchRinks(options).then((rinks) => {
                setRinks(rinks);
                setLoading(false);
            }
            ).catch((e) => {
                setError(e);
                setLoading(false);
            }).finally
            (() => setLoading(false));
    }, [options]);


    const refresh = () => {
        fetchRinks(options).then((rinks) => {
                setRinks(rinks);
                setLoading(false);
            }
            ).catch((e) => {
                setError(e);
                setLoading(false);
            }).finally
            (() => setLoading(false));
    }

    const resetOptions = () => {
        dispatch({ type: "RESET_OPTIONS" });
    }

    const setRinkFav = async (id: number, isFav: boolean) => {
        saveFavoriteStatus(id, isFav).then(() =>
            syncIsFavorite(rinks).then((rinks) => setRinks(rinks))
        );
    }

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
