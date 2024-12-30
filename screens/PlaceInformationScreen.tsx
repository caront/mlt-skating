import React, { FunctionComponent } from "react";

import PlaceInformation from "../components/PlaceInformation";
import { PlaceInformationScreenProps } from "./types";
import useHistory from "../hooks/UseHistory";
import { StyleSheet, View } from "react-native";
import PlaceHistoryList from "../components/PlaceHistoryList";

const PlaceInformationScreen: FunctionComponent<PlaceInformationScreenProps> = ({ route }) => {
    const { place } = route.params;
    const { isLoading, error, history } = useHistory({ place });
    return <View style={styles.container}>
        <View style={styles.information}>
            <PlaceInformation place={place} />
        </View>
        <View style={styles.history}>
            <PlaceHistoryList history={history} isLoading={isLoading} error={error} place={place} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 10
    },
    information: {
    
    },
    history: {

    }
});

export default PlaceInformationScreen;