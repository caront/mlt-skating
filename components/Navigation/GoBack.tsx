import React, { FunctionComponent } from "react";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { useColors } from "../../colors";
import { RootStackParamList } from "../../screens/types";
import FavButton from "../FavButton";



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

const GoBack: FunctionComponent<{ title: string }> = ({ title }) => {
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
            <Text style={{ flexWrap: 'wrap', maxWidth: '75%' }}>{title}</Text>
        </View>
       
    </View>
}


export default GoBack;