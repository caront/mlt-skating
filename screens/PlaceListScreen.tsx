import React, { FunctionComponent } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SkyList from "../components/SkyList";
import useFetchPlaces, { UseFetchPlacesProps } from "../hooks/UseFetchPlaces";
import { Icon, SearchBar } from "@rneui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { Place } from "../models/Place";
import SkyListSearch from "../components/SkyListSearch";
import usePlaceFilter from "../hooks/UsePlaceFilter";
import LinearGradient from "react-native-linear-gradient";
import { useColors } from "../colors";

export const PlaceListScreen = ({ }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [searchParam, setSearchParam] = React.useState<UseFetchPlacesProps>({
        searchTerm: '',
        open: undefined
    });

    const { places: placesSources, loading, error } = useFetchPlaces();
    const { places } = usePlaceFilter({ filter: searchParam, sources: placesSources });

    const handleOnPlacePressed = (place: Place) => {
        navigation.navigate('PlaceInformation', { place });
    }

    if (loading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <View>
            <Text>{error}</Text>
        </View>
    }

    return <View style={styles.container}>
        <View style={styles.searchBar}>
            <SkyListSearch onSearchPropChanged={setSearchParam} searchProp={searchParam} />
        </View>
        <View style={styles.list}>
            <SkyList places={places} onPlacePress={handleOnPlacePressed} />
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        minHeight: 75,
        gap: 10,
    },
    searchBar: {
    },
    list: {
        padding: 10,
    }
});