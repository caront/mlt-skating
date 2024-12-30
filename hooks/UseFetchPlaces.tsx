
import React from 'react';

import { Neibordhoods, Place } from '../models/Place';

import XMLParser from 'react-xml-parser'
import axios from 'axios';
import { PlaceNameCleaner } from '../utils/stringCleaner';
import getPlace from '../data/place';

interface UseFetchPlacesReturn {
    places: Place[];
    loading: boolean;
    error: string | null;
    neibordhoods: Neibordhoods[]
}

export interface UseFetchPlacesProps {
    open: boolean | undefined;
    searchTerm: string | undefined | '';
}

const placesEndPoint = 'https://donnees.montreal.ca/dataset/patinoires/resource/5b1244bd-7b92-436b-8a84-2fab1ea802a4/proxy'

const useFetchPlaces = (): UseFetchPlacesReturn => {
    const [places, setPlaces] = React.useState<Place[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(placesEndPoint);
                const dataParsed = new XMLParser().parseFromString(data);

                const places = dataParsed.children.map((patinoire: any) => {
                    const [
                        typeName,
                        neibordhoods,
                        open,
                        cleared,
                        watered,
                        resurfaced,
                        condition] = patinoire.children;
                    const [type, name] = typeName.value.split(',');
                    const [neibordHoodName, ABV, lastUpdate] = neibordhoods.children;
                    const locations = getPlace(ABV.value, typeName.value).coordinates;
                    console.log(locations);
                    return {
                        type,
                        name: PlaceNameCleaner(name),
                        neibordhoods: {
                            name: neibordHoodName.value,
                            abv: ABV.value
                        },
                        open: open.value === '1',
                        cleared: cleared.value === '1',
                        watered: watered.value === '1',
                        resurfaced: resurfaced.value === '1',
                        condition: condition.value,
                        lastUpdate: lastUpdate.value,
                        locations : {
                            lat: locations.latitude,
                            lng: locations.longitude
                        }
                    }
                });
                setPlaces(places);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    return {
        places, loading, error, neibordhoods: places.reduce((acc, place) => {
            if (!acc.find((neibordhood) => neibordhood.name === place.neibordhoods.name)) {
                acc.push(place.neibordhoods);
            }
            return acc;
        }, [] as Neibordhoods[])
    };
};


export default useFetchPlaces;