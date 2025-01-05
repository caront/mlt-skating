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
import useAskPermission from "../hooks/UseAskPermission";
import { Permission } from "react-native-permissions";

export const RinkListScreen = ({ }) => {
    // useAskPermission({ permissions: ['ios.permission.LOCATION_WHEN_IN_USE', 'android.permission.ACCESS_FINE_LOCATION'] });
    const [isMapVisible, setIsMapVisible] = React.useState(false);
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
        {!isMapVisible && <SkyList rinks={rinks} onRinkPress={handleOnRinkPressed} />}
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
    list : {
        flex: 1,
    }
});