import React, { FunctionComponent } from "react";

import RinkInformation from "../components/RinkInformation";
import { RinkInformationScreenProps } from "./types";
import useHistory from "../hooks/UseHistory";
import { StyleSheet, View } from "react-native";
import RinkHistoryList from "../components/RinkHistoryList";

const RinkInformationScreen: FunctionComponent<RinkInformationScreenProps> = ({ route }) => {
    const { rink } = route.params;
    const { isLoading, error, history } = useHistory({ rink });
    return <View style={styles.container}>
        <View style={styles.information}>
            <RinkInformation rink={rink} />
        </View>
        <View style={styles.history}>
            <RinkHistoryList history={history} isLoading={isLoading} error={error} rink={rink} />
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

export default RinkInformationScreen;