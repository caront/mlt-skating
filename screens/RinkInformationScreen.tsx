import React, { FunctionComponent } from "react";

import { RinkInformationScreenProps, RootStackParamList } from "./types";
import useHistory from "../hooks/UseHistory";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import RinkHistoryList from "../components/Rinks/RinkHistoryList";
import Animated from "react-native-reanimated";
import { Rink, RinkWithCondition } from "../models/Rink";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";
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

const RinkInformationHeader: FunctionComponent<{ rink: Rink }> = ({ rink }) => {
    const [isFav, setIsFav] = React.useState(false);
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
        <FavButton rink={rink} />
    </View>
}

const RinkInformationScreen: FunctionComponent<RinkInformationScreenProps> = ({ route }) => {
    const { rink: { id, name } } = route.params;
    const { rink, error, loading } = useRink(id);
    const styles = useStyle();

    if (loading || !rink) {
        return <SafeAreaView style={styles.container}>
            <RinkInformationHeader rink={route.params.rink} />
            <ActivityIndicator style={{ marginVertical: 16 }} />
        </SafeAreaView>
    }

    if (error) {
        return <SafeAreaView style={styles.container}>
            <RinkInformationHeader rink={route.params.rink} />
            <Text>{rink === null ? 'error fetch Rink info' : error?.message}</Text>
        </SafeAreaView>
    }


    return <SafeAreaView>
        <RinkInformationHeader rink={rink} />
        <ScrollView >
            <View style={styles.container}>
                <RinkInformations rink={rink} />
                <RinkConditions rink={rink} />
                <RinkMapInformation rink={rink} />
                <RinkHistoryList rink={rink} />
                <LastUpdate date={rink.lastUpdate} />
            </View>
        </ScrollView>
    </SafeAreaView>
}
export default RinkInformationScreen;