import React, { FunctionComponent } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import SkyList from "../components/RinkList";

import { Button, Icon, SearchBar } from "@rneui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { Rink, RinkWithDistrictAndCondition } from "../models/Rink";
import SkyListSearch from "../components/RinksFilters";
import MapRinkView from "../components/MapRinkView";
import { useRinks } from "../hooks/UseRinks";
import RinkList from "../components/RinkList";
import { useColors } from "../colors";

export const RinkListScreen = ({ }) => {
    const { rinks: rinksSources, loading, error } = useRinks();
    const [isMapVisible, setIsMapVisible] = React.useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const colors = useColors();

    const handleOnRinkPressed = (rink: RinkWithDistrictAndCondition) => {
        navigation.navigate('RinkInformation', { rink });
    }

    const handleOnMapPressed = () => {
        setIsMapVisible(!isMapVisible);
    }

    if (loading) {
        return <ActivityIndicator style={{ marginVertical: 16 }} />;
    }

    if (error) {
        return <View>
            <Text>{error.message}</Text>
        </View>
    }

    return <View style={styles.container}>
        <SkyListSearch style={styles.searchBarContainer} />
        {isMapVisible && <MapRinkView onRinkPress={handleOnRinkPressed} />}
        {!isMapVisible && <RinkList style={styles.list} onRinkPress={handleOnRinkPressed} />}
        <View style={styles.bottomRight}>
            <Icon
                color={colors.primary.midnightBlue}
                containerStyle={{
                    backgroundColor: colors.primary.snowWhite,
                    borderRadius: 50,
                }}
                disabledStyle={{}}
                name={isMapVisible ? "format-list-bulleted" : "map"}
                onPress={handleOnMapPressed}
                raised
                type="material"
            />
        </View>
        <View style={styles.bottomLeft}>
            <Icon
                color={colors.primary.midnightBlue}
                containerStyle={{
                    backgroundColor: colors.primary.snowWhite,
                    borderRadius: 50,
                }}
                disabledStyle={{}}
                name="info-outline"
                onPress={() => {}}
                raised
                type="material"
            />
        </View>
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
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    list: {
        flex: 1,
        paddingHorizontal: 10,
    },
    bottomLeft: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    bottomRight: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});
