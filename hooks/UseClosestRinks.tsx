import React from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { ECondition, Rink, RinkWithCondition } from "../models/Rink";
import { supabase } from "../supabase";
import { isRinkFavorite } from "../utils/favoritesUtils";

interface UseClosestRinksProps {
    rinkId: number;
}

interface UseClosestRinksReturn {
    loading: boolean;
    error: Error | PostgrestError | undefined;
    rinks: RinkWithCondition[];
}

const useClosestRinks = ({ rinkId }: UseClosestRinksProps): UseClosestRinksReturn => {

    const [rinks, setRinks] = React.useState<RinkWithCondition[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | PostgrestError | undefined>(undefined);

    const fetchClosestRinks = async (rinkId: number): Promise<void> => {
        setLoading(true);
        try {
            const { data, error } = await supabase.rpc('rink_around', { rinkid: rinkId, distance: 1000 }).limit(4);
            if (error) {
                throw error;
            }


            const rinks = await Promise.all(data.map(async (r: any) => {
                const isFav = await isRinkFavorite(r.id);
                return { ...r, isFav, iceQuality: r.conditions.ice_quality as ECondition, open: r.conditions.open } as RinkWithCondition;
            }));

            setRinks(rinks);
        } catch (e) {
            setError(e as Error | PostgrestError);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchClosestRinks(rinkId);
    }, [rinkId]);

    return { loading, error, rinks };
};

export default useClosestRinks;