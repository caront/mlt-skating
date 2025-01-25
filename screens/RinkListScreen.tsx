import React, { FunctionComponent, useCallback, useMemo } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SkyList from "../components/RinkList/RinkList";

import { Button, Icon, SearchBar } from "@rneui/themed";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { Rink, RinkWithCondition } from "../models/Rink";
import RinksFilters from "../components/RinksFilters";
import MapRinkView from "../components/MapRinkView";
import { useRinks } from "../hooks/UseRinks";
import RinkList from "../components/RinkList/RinkList";
import { useColors } from "../colors";
import RinkCount from "../components/RinkCount";
import BlurIconButton from "../components/shared/BlurButton";
import useUserLocation from "../hooks/UseUserLocation";

export const RinkListScreen = ({ }) => {
    const { rinks, refresh, loading, error } = useRinks();
    const [isMapVisible, setIsMapVisible] = React.useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const colors = useColors();

    const handleOnRinkPressed = (rink: Rink) => {
        navigation.navigate('RinkInformation', { rink });
    }

    const handleOnMapPressed = () => {
        setIsMapVisible(!isMapVisible);
    }

    const BottomButtons = useMemo(() => (
        <View style={styles.bottomButtonContainer}>

            <BlurIconButton
                height={55}
                width={55}
                blur={true}
                icon={{
                    name: 'info-outline',
                    type: 'material',
                    color: colors.grey5,
                }}
                onPress={() => { }}
            />

            <BlurIconButton
                height={55}
                width={55}
                blur={true}
                icon={{
                    name: isMapVisible ? "format-list-bulleted" : "map",
                    type: 'material',
                    color: colors.grey5,
                }}
                onPress={handleOnMapPressed}>
            </BlurIconButton>
        </View>
    ), [isMapVisible]);
    if (error) {
        return  <SafeAreaView style={styles.container}>
            <Text>{error.message}</Text>
        </SafeAreaView>
    }

    if (loading) {
        return <SafeAreaView style={styles.container}>
            <ActivityIndicator style={{ marginVertical: 16 }} />
        </SafeAreaView>
    }




    if (isMapVisible) {
        return <>
            <MapRinkView onRinkPress={handleOnRinkPressed} />
            <SafeAreaView style={{ position: 'absolute', top: 24, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent' }} pointerEvents="box-none">
                <RinksFilters isMapVisible={true} />
                {BottomButtons}
            </SafeAreaView>
        </>
    }

    return <>
        <SafeAreaView style={styles.container}>
            <RinksFilters isMapVisible={false} />
            <RinkCount style={styles.list} />
            <SkyList onRinkPress={handleOnRinkPressed} style={styles.list} />
            {BottomButtons}
        </SafeAreaView>
    </>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
    },
    searchBarContainer: {
        backgroundColor: 'red',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    searchBarContainerMapView: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'transparent',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    list: {
        paddingHorizontal: 10,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    }

});
