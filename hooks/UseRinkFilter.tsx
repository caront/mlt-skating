

import React from 'react';
import { ECondition, Rink, RinkWithDistrictAndCondition } from '../models/Rink';
import { StringCleaner } from '../utils/stringCleaner';

export interface Filters {
    searchTerm: string | undefined | '';
    open: boolean | undefined;
    districts: string[] | undefined;
    conditions: ECondition[]
}

export interface UseRinkFilterProps {
    filter: Filters;
    sources: RinkWithDistrictAndCondition[];
}

interface UseRinkFilterReturn {
    rinks: RinkWithDistrictAndCondition[];
}


const useRinkFilter = (props: UseRinkFilterProps): UseRinkFilterReturn => {

    const [rinks, setRinks] = React.useState<RinkWithDistrictAndCondition[]>(props.sources);

    React.useEffect(() => {
        let filteredRinks = props.sources;
        if (props.filter.open !== undefined) {
            filteredRinks = filteredRinks.filter((rink) => rink.open === props.filter.open);
        }
        if (props.filter.searchTerm !== undefined && props.filter.searchTerm !== '') {
            filteredRinks = filteredRinks.filter((rink) =>
                StringCleaner(rink.name).includes(StringCleaner(props.filter.searchTerm as string))
            );
        }
        if (props.filter.districts !== undefined && props.filter.districts.length > 0) {
            filteredRinks = filteredRinks.filter((rink) => {
                if (props.filter.districts === undefined)
                    return true;
                return props.filter.districts.includes(rink.districtAbv);
            }

            );
        }
        if (props.filter.conditions !== undefined && props.filter.conditions.length > 0) {
            filteredRinks = filteredRinks.filter((rink) => {
                if (props.filter.conditions === undefined)
                    return true;
                return props.filter.conditions.includes(rink.condition);
            });
        }
        setRinks(filteredRinks);
    }, [props.filter]);

    React.useEffect(() => {
        if (rinks.length === 0)
            setRinks(props.sources);
    }, [props.sources]);

    return {
        rinks
    }
};

export default useRinkFilter;