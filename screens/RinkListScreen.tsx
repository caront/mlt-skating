import React, { FunctionComponent } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import SkyList from "../components/RinkList";

import { Icon, SearchBar } from "@rneui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { Rink, RinkWithDistrictAndCondition } from "../models/Rink";
import SkyListSearch from "../components/RinkListSearch";
import useRinkFilter, { Filters } from "../hooks/UseRinkFilter";
import useRinkConditions from "../hooks/UseRinkConditions";

export const RinkListScreen = ({ }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [searchParam, setSearchParam] = React.useState<Filters>({
        searchTerm: '',
        open: undefined,
        districts: [],
        conditions: []
    });

    const { rinks: rinksSources, loading, error } = useRinkConditions();
    const { rinks } = useRinkFilter({ filter: searchParam, sources: rinksSources });

    const handleOnRinkPressed = (rink: RinkWithDistrictAndCondition) => {
        navigation.navigate('RinkInformation', { rink });
    }

    const handleOnMapPressed = () => {

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
            <SkyListSearch onSearchPropChanged={setSearchParam} onMapSearchPressed={handleOnMapPressed} searchProp={searchParam} />
        </View>
        <View style={styles.list}>
            <SkyList rinks={rinks} onRinkPress={handleOnRinkPressed} />
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