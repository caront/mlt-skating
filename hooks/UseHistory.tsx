import React, { FunctionComponent } from "react";
import { Rink, RinkHistory } from "../models/Rink";
import DayJs from "dayjs";

interface UseHistoryProps {
    rink: Rink;
}

interface UseHistoryReturn {
    isLoading: boolean;
    error: string;
    history: RinkHistory[];
}

const endpoint = 'https://donnees.montreal.ca/api/3/action/datastore_search_sql';

//SELECT * from "f1381e6d-07c2-4731-ae21-30f099403294" where "DATE_TRS" > '2024-12-01'
const quertBuilder = (rink: Rink) => {
    const query = `SELECT * from "f1381e6d-07c2-4731-ae21-30f099403294" where "DATE_TRS" > '${DayJs().subtract(2, 'week').format('YYYY-MM-DD')}' AND "PATINOIRE" ILIKE '%${rink.name}%' ORDER BY "DATE_TRS" DESC`;
    return query;
};

const useHistory = ({ rink }: UseHistoryProps): UseHistoryReturn => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [history, setHistory] = React.useState<RinkHistory[]>([]);

    React.useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                const query = quertBuilder(rink);
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
    }, [rink]);

    return { isLoading, error, history };
};

export default useHistory;