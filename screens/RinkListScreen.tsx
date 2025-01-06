import React, { FunctionComponent } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import SkyList from "../components/RinkList";

import { Button, Icon, SearchBar } from "@rneui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { Rink, RinkWithDistrictAndCondition } from "../models/Rink";
import SkyListSearch from "../components/RinkListSearch";
import useRinkFilter, { Filters } from "../hooks/UseRinkFilter";
import useRinkConditions from "../hooks/UseRinkConditions";
import MapRinkView from "../components/MapRinkView";

export const RinkListScreen = ({ }) => {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [isMapVisible, setIsMapVisible] = React.useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [searchParam, setSearchParam] = React.useState<Filters>({
        searchTerm: '',
        open: undefined,
        districts: [],
        conditions: []
    });

    const { rinks: rinksSources, loading, error, fetchData } = useRinkConditions();
    const { rinks } = useRinkFilter({ filter: searchParam, sources: rinksSources });

    const onRinkListRefresh = () => {
        setIsRefreshing(true);
        fetchData();
    }

    React.useEffect(() => {
        if (isRefreshing) {
            setIsRefreshing(false);
        }
    }, [isRefreshing]);

    const handleOnRinkPressed = (rink: RinkWithDistrictAndCondition) => {
        navigation.navigate('RinkInformation', { rink });
    }

    const handleOnMapPressed = () => {
        setIsMapVisible(!isMapVisible);
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
        <Button icon={<Icon name='map' />} onPress={handleOnMapPressed} />
        <SkyListSearch onSearchPropChanged={setSearchParam} onMapSearchPressed={handleOnMapPressed} searchProp={searchParam} />
        {isMapVisible && <MapRinkView rinks={rinks} onRinkPress={handleOnRinkPressed} />}
        {!isMapVisible && <SkyList style={styles.list} rinks={rinks} onRinkPress={handleOnRinkPressed} onRinkListRefresh={onRinkListRefresh} isRefreshing={isRefreshing} />}
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        minHeight: 75,
        gap: 10,
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        flex: 1,
    },
    list: {
        flex: 1,
        paddingHorizontal: 10,
    }
});