import React, { FunctionComponent } from "react";

import { RinkInformationScreenProps, RootStackParamList } from "./types";
import useHistory from "../hooks/UseHistory";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import RinkHistoryList from "../components/Rinks/RinkHistoryList";
import Animated from "react-native-reanimated";
import { Rink, RinkWithCondition } from "../models/Rink";
import { CommonActions, NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { useColors } from "../colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRink } from "../hooks/UseRink";
import { ScrollView } from "react-native-gesture-handler";
import LastUpdate from "../components/Rinks/LastUpdate";
import BlurIconButton from "../components/shared/BlurButton";
import FavButton from "../components/FavButton";
import { RinkMapInformation } from "../components/Rinks/RinkMapInformation";
import RinkConditions from "../components/Rinks/RinkCondition";
import RinkInformations from "../components/Rinks/RinkInformations";
import LoadingFullScreen from "../components/shared/LoadingFullScreen";
import Ads from "../components/shared/Ads";
import ClosestRinks from "../components/Rinks/ClosestRinks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const useStyle = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            display: 'flex',
            padding: 10,
            gap: 10,
            paddingBottom: 100,
        },
        information: {

        },
        history: {
            marginTop: 10,
            marginBottom: 10,
        },
        header: {
            fontSize: 50,
            color: colors.grey5,
            display: 'flex',
            paddingRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            gap: 10,
        },
        card: {
            display: 'flex',
            backgroundColor: colors.white,
            shadowColor: '#000',
            borderRadius: 30,
            height: 55,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 1,
            padding: 10,
        },
        goBackButton: {
            borderRadius: 30,
            width: 55,
            height: 55,
            backgroundColor: 'transparent',
        },
    });
}

const RinkInformationHeader: FunctionComponent<{ rink: Rink, loadingOrError: boolean }> = ({ rink, loadingOrError = false }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const colors = useColors();
    const styles = useStyle();


    const handleOnRinkPressed = () => {
        navigation.dispatch(CommonActions.goBack());
    }

    return <View style={[styles.header]}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

            <Button buttonStyle={styles.goBackButton}
                icon={{
                    name: 'arrow-back',
                    type: 'material',
                    color: colors.grey5,
                }}
                titleStyle={{ fontWeight: 'bold' }} onPress={() => handleOnRinkPressed()}>
            </Button>
            <Text style={{ flexWrap: 'wrap', maxWidth: '75%' }}>{rink.name}</Text>
        </View>
        {!loadingOrError && <FavButton rink={rink} />}
    </View>
}

type Props = NativeStackScreenProps<RootStackParamList, 'RinkInformationScreen'>;

const RinkInformationScreen: FunctionComponent<Props> = ({ }) => {
    const { params } = useRoute<RouteProp<RootStackParamList, "RinkInformationScreen">>();
    const { rink : rinkParam } = params;
    const { rink, error, loading } = useRink(rinkParam.id);
    const styles = useStyle();

    if (loading || !rink) {
        return <LoadingFullScreen loading={loading} />
    }

    if (error) {
        return <SafeAreaView style={styles.container}>
            <RinkInformationHeader rink={rinkParam} loadingOrError={true} />
            <Text>{rink === null ? 'error fetch Rink info' : error?.message}</Text>
        </SafeAreaView>
    }

    return <SafeAreaView>
        <RinkInformationHeader rink={rink} loadingOrError={false} />
        <ScrollView>
            <View style={styles.container}>
                <RinkInformations rink={rink} />
                <RinkConditions rink={rink} />
                <ClosestRinks rink={rink} />
                <RinkMapInformation rink={rink} />
                <Ads display />
                <RinkHistoryList rink={rink} />
                <LastUpdate date={rink.lastUpdate} />
            </View>
        </ScrollView>
    </SafeAreaView>
}
export default RinkInformationScreen;