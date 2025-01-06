
import React from 'react';

import { Rink, RinkWithDistrictAndCondition } from '../models/Rink';

import XMLParser from 'react-xml-parser'
import axios from 'axios';
import { getRink } from '../data/rinks';

interface UseRinkConditionsReturn {
    rinks: RinkWithDistrictAndCondition[];
    loading: boolean;
    error: string | null;
    fetchData: () => void;
}

export interface UseRinkConditionsProps {
    open: boolean | undefined;
    searchTerm: string | undefined | '';
}

const rinksEndPoint = 'https://donnees.montreal.ca/dataset/patinoires/resource/5b1244bd-7b92-436b-8a84-2fab1ea802a4/proxy'

const useRinkConditions = (): UseRinkConditionsReturn => {
    const [rinks, setRinks] = React.useState<RinkWithDistrictAndCondition[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const fetchData = async () => {
        try {
            console.log('fetching data');
            const { data } = await axios.get(rinksEndPoint);
            const dataParsed = new XMLParser().parseFromString(data);
            const rinks = dataParsed.children.map((patinoire: any): RinkWithDistrictAndCondition => {
                const [
                    name,
                    neibordhoods,
                    open,
                    cleared,
                    watered,
                    resurfaced,
                    condition] = patinoire.children;

                const [neibordHoodName, ABV, lastUpdate] = neibordhoods.children;
                const rink = getRink(ABV.value, name.value);

                return {
                    ...rink,
                    open: open.value === '1',
                    cleared: cleared.value === '1',
                    watered: watered.value === '1',
                    resurfaced: resurfaced.value === '1',
                    condition: condition.value,
                    lastUpdate: lastUpdate.value,

                }
            });
            setRinks(rinks);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
        finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);


    return {
        rinks, loading, error, fetchData
    };
};


export default useRinkConditions;