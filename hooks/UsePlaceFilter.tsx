

import React from 'react';
import { Place } from '../models/Place';
import { StringCleaner } from '../utils/stringCleaner';

export interface Filters {
    searchTerm: string | undefined | '';
    open: boolean | undefined;
}

export interface UsePlaceFilterProps {
    filter: Filters;
    sources: Place[];
}

interface UsePlaceFilterReturn {
    places: Place[];
}


const usePlaceFilter = (props: UsePlaceFilterProps): UsePlaceFilterReturn => {

    const [places, setPlaces] = React.useState<Place[]>(props.sources);

    React.useEffect(() => {
        let filteredPlaces = props.sources;
        if (props.filter.open !== undefined) {
            filteredPlaces = filteredPlaces.filter((place) => place.open === props.filter.open);
        }
        if (props.filter.searchTerm !== undefined && props.filter.searchTerm !== '') {
            filteredPlaces = filteredPlaces.filter((place) =>
                StringCleaner(place.name).includes(StringCleaner(props.filter.searchTerm as string))
            );
        }
        setPlaces(filteredPlaces);
    }, [props.filter]);

    React.useEffect(() => {
        if (places.length === 0)
            setPlaces(props.sources);
    }, [props.sources]);

    return {
        places
    }
};

export default usePlaceFilter;