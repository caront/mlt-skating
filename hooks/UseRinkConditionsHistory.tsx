import React from "react";

import { Condition } from "../models/Rink";
import { ApolloError, useQuery } from "@apollo/client";
import { GET_RINK_HISTORY } from "../graphql/RinkConditionsQueries";
import { ConditionChanges } from "../models/ConditionHistory";

interface UseRinkConditionsHistoryReturn {
    loading: boolean;
    error: Error | ApolloError | undefined;
    conditions: Condition[];
}


function getChanges(conditions: Condition[]): ConditionChanges[] {
    const changes: ConditionChanges[] = [];

    for (let i = 1; i < conditions.length; i++) {
        const prev = conditions[i - 1];
        const curr = conditions[i];

        if (
            prev.condition !== curr.condition ||
            prev.open !== curr.open ||
            prev.watered !== curr.watered ||
            prev.resurfaced !== curr.resurfaced
        ) {
            changes.push({
                previous: prev,
                current: curr,
            });
        }
    }

    return changes;
}


const buildHistory = (data: any): Condition[] => {
    try {
        const conditions = data.rinksCollection.edges[0].node.conditionsCollection.edges.map(
            (edge: any): Condition => {
                return {
                    id: edge.node.id,
                    condition: edge.node.condition,
                    open: edge.node.open,
                    watered: edge.node.watered,
                    resurfaced: edge.node.resurfaced,
                    cleared: edge.node.cleared,
                    updatedAt: edge.node.updated_at,
                };
            }
        );

        return (conditions);

        // return data.rinksCollection.edges[0].node.conditionsCollection.edges.map((edge: any) : ConditionHistory => {
        //     return {
        //         id: edge.node.id,
        //         condition: edge.node.condition,
        //         open: edge.node.open,
        //         watered: edge.node.watered,
        //         resurfaced: edge.node.resurfaced,
        //         cleared: edge.node.cleared,
        //         updatedAt: edge.node.updated_at
        //     }
        // });
    } catch (e) {
        return [];
    }
}

export const useRinkConditionsHistory = (rinkId: number): UseRinkConditionsHistoryReturn => {
    const { data, loading, error } = useQuery(GET_RINK_HISTORY, {
        variables: { rinkId }
    });

    const conditions = loading || error ? [] : buildHistory(data);

    return {
        loading,
        error,
        conditions
    }
};
