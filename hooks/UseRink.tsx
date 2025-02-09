import { ApolloError, useQuery } from "@apollo/client";
import React from "react";
import { defaultRinkWithDistrictAndConditionLastUpdate, ECondition, RinkWithDistrictAndConditionLastUpdate } from "../models/Rink";
import { GET_RINK_HISTORY } from "../graphql/RinkConditionsQueries";
import { GET_RINKS_BY_ID } from "../graphql/RinkQueries";

interface UseRinkReturn {
    loading: boolean;
    error: Error | ApolloError | undefined;
    rink: RinkWithDistrictAndConditionLastUpdate | null;
}

const buildRink = (data: any): RinkWithDistrictAndConditionLastUpdate | null => {
    try {
        const { id, name, type, description, districts: district, longitude, latitude, rink_name, conditionsCollection, public_static_map_url, address, schedules, services, information,
            description_fr, description_en, information_fr, information_en
        } = data;
        if (conditionsCollection.edges.length === 0) {
            return {
                ...defaultRinkWithDistrictAndConditionLastUpdate,
                id,
                name,
                type,
                description,
                district,
                longitude,
                latitude,
                rink_name,
                public_url: public_static_map_url,
                description_fr,
                description_en,
                information_fr,
                information_en
            }
        }

        let lastTimeWatered = null;
        let lastTimeResurfaced = null
        let lastTimeCleared = null
        let lastTimeOpen = null
        let openSince = null

        for (let idx = conditionsCollection.edges.length - 1; idx >= 0; idx--) {
            const { open, condition, cleared, watered, resurfaced, updated_at } = conditionsCollection.edges[idx].node;
            if (open) {
                lastTimeOpen = updated_at
                if (openSince === null) {
                    openSince = updated_at
                }
            }
            if (cleared) {
                lastTimeCleared = updated_at
            }
            if (watered) {
                lastTimeWatered = updated_at
            }
            if (resurfaced) {
                lastTimeResurfaced = updated_at
            }
        }

        return {
            id,
            name,
            type,
            description,
            lastUpdate: conditionsCollection.edges[0].node.updated_at,
            district,
            longitude,
            latitude,
            rink_name,
            cleared: conditionsCollection.edges[0].node.cleared,
            open: conditionsCollection.edges[0].node.open,
            condition: conditionsCollection.edges[0].node.condition,
            watered: conditionsCollection.edges[0].node.watered,
            resurfaced: conditionsCollection.edges[0].node.resurfaced,
            lastTimeCleared,
            lastTimeOpen,
            lastTimeResurfaced,
            lastTimeWatered,
            openSince,
            updatedAt: conditionsCollection.edges[0].node.updated_at,
            isFav: false,
            public_url: public_static_map_url,
            address,
            schedules: JSON.parse(schedules),
            services,
            information,
            description_fr,
            description_en,
            information_fr,
            information_en
        }
    }
    catch (e) {
        console.log(e);
    }
    return null;
}

export const useRink = (rinkId: number): UseRinkReturn => {
    const { data, loading, error } = useQuery(GET_RINKS_BY_ID, {
        variables: { rinkId }
    });

    const rink = loading || error ? null : buildRink(data?.rinksCollection.edges[0].node);

    return { loading: false, error: undefined, rink };
};