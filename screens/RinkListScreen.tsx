import React, { FunctionComponent, RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { ActivityIndicator, Dimensions, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { Rink } from "../models/Rink";
import RinksFilters from "../components/RinksFilters";
import MapRinkView from "../components/MapRinkView";
import RinkList from "../components/RinkList/RinkList";
import { useColors } from "../colors";
import ActionSheet, { ActionSheetRef, useScrollHandlers } from "react-native-actions-sheet";
import { useRinkGroups } from "../hooks/UseRinkGroup";
import ButtonIcon from "../components/shared/ButtonIcon";
import LoadingFullScreen from "../components/shared/LoadingFullScreen";
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { useRinks } from "../hooks/UseRinks";
import { Button } from "@rneui/base";

export const RinkListScreen = ({ }) => {
    const { rinks, loading, error } = useRinks();
    const [isShowFav, setIsShowFav] = React.useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const colors = useColors();

    const [index, setIndex] = React.useState(0);

    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (actionSheetRef && actionSheetRef.current)
            actionSheetRef.current?.show();
    }, [actionSheetRef.current]);

    useEffect(() => {
        if (actionSheetRef && actionSheetRef.current)
            actionSheetRef.current?.snapToIndex(index);
    }, [index]);



    const handleOnRinkPressed = (rink: Rink) => {
        navigation.navigate('RinkInformation', { rink });
    }

    if (error) {
        return <SafeAreaView style={styles.container}>
            <Text>{error.message}</Text>
        </SafeAreaView>
    }

    const handleOnSettingsButtonPressed = () => {
        navigation.navigate('Settings');
    }


    return <>
        <MapRinkView style={styles.map} onRinkPress={handleOnRinkPressed} />

        <SafeAreaView style={{ position: 'absolute', top: 24, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent' }} pointerEvents="box-none">
            <View
                style={styles.buttonContainer}
            >

                <Button icon={{
                    name: 'settings-sharp',
                    type: 'ionicon',
                    color: colors.white,
                    size: 30,
                }}
                    onPress={handleOnSettingsButtonPressed}
                    buttonStyle={{
                        borderRadius: 30,
                        backgroundColor:'transparent',
                    }} />
            </View>
            <ActionSheet
                ref={actionSheetRef}
                isModal={false}
                snapPoints={[30, 50, 80]}
                gestureEnabled
                elevation={0}
                closable={false}
                backgroundInteractionEnabled
                disableDragBeyondMinimumSnapPoint
                useBottomSafeAreaPadding={false}
                containerStyle={{ backgroundColor: 'transparent', elevation: 0, borderRadius: 30 }}
            >
                <View style={[styles.list, { height: Dimensions.get('screen').height, backgroundColor: colors.background, borderRadius: 30, padding: 10, paddingTop: 16 }]}>
                    <RinksFilters isMapVisible={false} />
                    <RinkList onRinkPress={handleOnRinkPressed} style={styles.list} />
                </View>
            </ActionSheet>
        </SafeAreaView >
        <LoadingFullScreen loading={loading} />
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
        gap: 10,
    },
    map: {
        height: '75%'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    buttonContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    }

});
