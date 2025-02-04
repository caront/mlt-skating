import React, { createContext, useEffect, useReducer, useState } from "react";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { RinkGroup } from "../models/RinkGroup";
import { Action, defaultSearchOption, rinkGroupReducer, RinkGroupSearchOption } from "../reducers/RinkGroupReducer";
import { useLocates } from "../hooks/UseLocation";
import { GET_RINK_GROUPS } from "../graphql/RinkGroupQueries";
import { defaultRinkWithCondition, RinkWithCondition } from "../models/Rink";
import { isRinkFavorite } from "../utils/favoritesUtils";
import { StringCleaner } from "../utils/stringCleaner";
import { getDistanceBetweenCoordinates } from "../utils/distance";
import { Log } from "../utils/logs";


export type RinkGroupContextType = {
    rinkGroups: RinkGroup[];
    loading: boolean;
    error: Error | ApolloError | undefined;
    options: RinkGroupSearchOption;
    refresh: () => void;
    resetOptions: () => void;
    dispatch: React.Dispatch<Action>;
    setRinkGroupFavorite: (id: number, isFav: boolean) => void;
}

const defaultRinkGroupContext: RinkGroupContextType = {
    rinkGroups: [],
    loading: false,
    error: undefined,
    options: defaultSearchOption,
    refresh: () => { },
    resetOptions: () => { },
    dispatch: () => { },
    setRinkGroupFavorite: (id: number, isFav: boolean) => { }
}

export const RinkGroupContext = createContext<RinkGroupContextType>(defaultRinkGroupContext);



export const RinkGroupProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { isLocationEnabled, location } = useLocates();
    const [sourceRinkGroups, setSourceRinkGroups] = useState<RinkGroup[]>([]);
    const [rinkGroups, setRinkGroups] = useState<RinkGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | ApolloError>();

    const [loadRinkGroup] = useLazyQuery(GET_RINK_GROUPS);
    const [options, dispatch] = useReducer(rinkGroupReducer, defaultSearchOption);

    const fetchAllRinkGroup = async () => {
        let allRinkGroups: any[] = [];
        let hasNextPage = true;
        let after: string | null = null;

        while (hasNextPage) {
            const { data, error } = await loadRinkGroup({
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
            if (!data) {
                setLoading(false);
                return;
            }
            const { edges, pageInfo } = data.rink_groupsCollection;

            // Add current page rinks to the list
            allRinkGroups = [...allRinkGroups, ...edges.map((edge: any) => edge.node)];
            // Update pagination variables
            hasNextPage = pageInfo.hasNextPage;
            after = pageInfo.endCursor;
        }
        const tmp = await Promise.all(
            allRinkGroups.map(async (group: any): Promise<RinkGroup> => {
                const { id, name, description, latitude, longitude, hours, services, districts: district, rink_group_rinkCollection } = group;

                const rinks =
                    await Promise.all(rink_group_rinkCollection.edges.map(async (node: any): Promise<RinkWithCondition> => {
                        try {
                            const rink = node.node.rinks;
                            const { id, name, type, description, longitude, latitude, rink_name, conditionsCollection } = rink;
                            const conditions = conditionsCollection.edges.length > 0 ? conditionsCollection.edges[0].node : undefined;
                            const { open, condition, cleared, watered, resurfaced, updated_at } = conditions || {};
                            const isFav = await isRinkFavorite(id);
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
                                cleared: cleared,
                                open: open,
                                condition: condition,
                                watered: watered,
                                resurfaced: resurfaced,
                                isFav,
                                public_url: undefined
                            }
                        }
                        catch (ex) {
                            console.log('error', ex)
                        }
                        return defaultRinkWithCondition;
                    }));
                // const isFav = await getRinkGroupFavorite(id);
                return {
                    id,
                    name,
                    description,
                    latitude,
                    longitude,
                    hours,
                    services,
                    district,
                    rinks
                }
            })
        )
        setSourceRinkGroups(tmp);
    }


    useEffect(() => {
        fetchAllRinkGroup();
    }, []);

    React.useEffect(() => {
        if (sourceRinkGroups.length === 0 || loading) return;
        filters();
    }, [options, sourceRinkGroups]);

    const filters = async () => {
        setLoading(true);
        try {
            let filteredRinkGroups = sourceRinkGroups;
            if (options.onlyOpen) {
                filteredRinkGroups = filteredRinkGroups.filter((group) => group.rinks.some((rink) => rink.open));
            }
            if (options.name !== '') {
                filteredRinkGroups = filteredRinkGroups.filter((group) =>
                    StringCleaner(group.name).toUpperCase().includes(StringCleaner(options.name as string).toUpperCase())
                );
            }
            if (options.districts !== undefined && options.districts.length > 0) {
                filteredRinkGroups = filteredRinkGroups.filter((group) => {
                    return options.districts.includes(group.district.id);
                }

                );
            }
            if (options.conditions !== undefined && options.conditions.length > 0) {
                filteredRinkGroups = filteredRinkGroups.filter((group) => {
                    group.rinks.some((rink) => {

                        return options.conditions.includes(rink.condition);
                    })
                });
            }
            if (options.onlyFavorite === true) {
                filteredRinkGroups = filteredRinkGroups.filter((group) => group.rinks.some((rink) => rink.isFav));
            }
            // if (!isLocationEnabled) {
            setRinkGroups(filteredRinkGroups.sort((a, b) => a.name.localeCompare(b.name)));
            // }
            // else {
            //     filteredRinkGroups.forEach((group) => {
            //         group.distance = getDistanceBetweenCoordinates(location, group);
            //     })
            //     setRinkGroups(filteredRinkGroups.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0)));
            // }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    }

    const setRinkGroupFavorite = (id: number, isFav: boolean) => {
        // const updatedRinkGroups = rinkGroups.map((group) => {
        // if (group.id === id) {
        //     group.isFav = isFav;
        // }
        // return group;
        // });
        // setRinkGroups(updatedRinkGroups);
    }

    React.useEffect(() => {
        if (rinkGroups.length === 0)
            filters();
    }, [sourceRinkGroups]);


    return <RinkGroupContext.Provider value={{
        rinkGroups,
        loading,
        error,
        options,
        refresh: fetchAllRinkGroup,
        resetOptions: () => dispatch({ type: 'RESET_OPTIONS' }),
        dispatch,
        setRinkGroupFavorite
    }}>
        {children}
    </RinkGroupContext.Provider>
};

