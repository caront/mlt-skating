import React, { createContext, useEffect, useReducer, useState } from "react";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { defaultCondition, Rink, RinkWithCondition } from "../models/Rink";
import { GET_RINKS } from "../graphql/RinkQueries";
import { Action, RinkSearchOption, defaultSearchOption, rinkReducer } from "../reducers/RinkReducer";
import { StringCleaner } from "../utils/stringCleaner";
import dayjs from "dayjs";
import { getFavorites, isRinkFavorite, saveFavoriteStatus } from "../utils/favoritesUtils";
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
};

export const RinkContext = createContext<RinkContextType>(defaultDistritContext);


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
            iceQuality: conditions.ice_condition,
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
    const { location } = useLocates();

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


    React.useEffect(() => {
        fetchRinks({ ...options, location }).then((rinks) => {
            setRinks(rinks);
            setLoading(false);
        }
        ).catch((e) => {
            setError(e);
            setLoading(false);
        }).finally
            (() => setLoading(false));
    }, [location]);

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
        saveFavoriteStatus(id, isFav).then(() => {
            const rinkIndex = rinks.findIndex((rink) => rink.id === id);
            rinks[rinkIndex].isFav = isFav;
            setRinks(rinks);
        });
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
            setRinkFavorite: setRinkFav
        }}>
            {children}
        </RinkContext.Provider>
    );
};
