import { ApolloError, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Condition, defaultRinkWithDistrictAndConditionLastUpdate, ECondition, RinkWithDistrictAndConditionLastUpdate } from "../models/Rink";
import { GET_RINK_HISTORY } from "../graphql/RinkConditionsQueries";
import { GET_RINKS_BY_ID } from "../graphql/RinkQueries";
import { supabase } from "../supabase";
import { isRinkFavorite } from "../utils/favoritesUtils";
import { PostgrestError } from "@supabase/supabase-js";
import { Schedule } from "../models/RinkGroup";

interface UseRinkReturn {
    loading: boolean;
    error: Error | ApolloError | PostgrestError | undefined;
    rink: RinkWithDistrictAndConditionLastUpdate | null;
}


const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]

export const useRink = (rinkId: number): UseRinkReturn => {
    const [rink, setRink] = React.useState<RinkWithDistrictAndConditionLastUpdate | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | ApolloError | undefined>(undefined);

    const fetchErinkById = async (rinkId: number): Promise<RinkWithDistrictAndConditionLastUpdate | null> => {
        const { data, error } = await supabase.rpc('get_rink', { rink_id: rinkId });
        if (error) {
            throw error;
        }
        if (data.length !== 1) {
            throw new Error('Rink not found');
        }
        const isFav = await isRinkFavorite(rinkId);

        const rawRink = data[0];
        const { conditions_history: conditions, ...rink } = rawRink;

        const condition_history: Condition[] = (conditions || []).map((c: any): Condition => ({
            ...c,
            updatedAt: c.updated_at,
            iceQuality: c.ice_quality as ECondition,

        })).slice(0, 15);
        const condition: Condition = condition_history.length > 0 ? condition_history[0] : {
            open: false,
            cleared: false,
            watered: false,
            resurfaced: false,
            updatedAt: '',
            iceQuality: ECondition.NA,
        } as Condition;

        condition['id'] = rinkId;

        const schedule = DAYS.map((day: string): Schedule => {
            try {
                const schedule = (rawRink.schedules || []).find((s: any) => s.dayOfWeek === day || s.dayOfWeek === 'ALL');
                if (schedule) {
                    return {
                        dayOfWeek: day,
                        opens: schedule.opens,
                        closes: schedule.closes,
                    };
                }
                return {
                    dayOfWeek: day,
                    opens: '00:00',
                    closes: '23:59',
                }
            }
            catch (e) {
                console.log(e);
            }
            return {
                dayOfWeek: day,
                opens: '00:00',
                closes: '23:59',
            }
        });

        return {
            ...rink,
            isFav,
            ...condition,
            schedules: schedule,
            public_url: rawRink.public_static_map_url,
            conditions: condition_history,
            updatedAt: rawRink.updated_at,
            lastTimeCleared: rawRink.last_cleared_true,
            lastTimeOpen: rawRink.last_open_true,
            lastTimeResurfaced: rawRink.last_resurfaced_true,
            lastTimeWatered: rawRink.last_watered_true,
        };
    }

    useEffect(() => {
        setLoading(true);
        fetchErinkById(rinkId).then((rink) => {
            setRink(rink);
        }).catch((e) => {
            setError(e);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return { loading, error, rink };
};