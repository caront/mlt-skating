import React, { FunctionComponent } from "react";
import { Place, PlaceHistory } from "../models/Place";
import DayJs from "dayjs";

interface UseHistoryProps {
    place: Place;
}

interface UseHistoryReturn {
    isLoading: boolean;
    error: string;
    history: PlaceHistory[];
}

const endpoint = 'https://donnees.montreal.ca/api/3/action/datastore_search_sql';

//SELECT * from "f1381e6d-07c2-4731-ae21-30f099403294" where "DATE_TRS" > '2024-12-01'
const quertBuilder = (place: Place) => {
    const query = `SELECT * from "f1381e6d-07c2-4731-ae21-30f099403294" where "DATE_TRS" > '${DayJs().subtract(2, 'week').format('YYYY-MM-DD')}' AND "PATINOIRE" ILIKE '%${place.name}%' ORDER BY "DATE_TRS" DESC`;
    return query;
};

const useHistory = ({ place }: UseHistoryProps): UseHistoryReturn => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [history, setHistory] = React.useState<PlaceHistory[]>([]);

    React.useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                const query = quertBuilder(place);
                const encodedQuery = `sql=${query}`;
                const url = endpoint + '?' + encodedQuery;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                );
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error.message);
                }
                setHistory(data.result.records.map((record: any) => ({
                    date: record.DATE_TRS,
                    open: record.OUVERT === '1',
                    cleared: record.DEGAGE === '1',
                    watered: record.ARROSEE === '1',
                    resurfaced: record.RESURFACAGE === '1',
                    condition: record.CONDITION_PATINOIRE
                })));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [place]);

    return { isLoading, error, history };
};

export default useHistory;