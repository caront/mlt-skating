import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef } from "react";
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
import ActionSheet, { ActionSheetRef, SheetProvider } from "react-native-actions-sheet";
import { Tab } from '@rneui/themed';
import { Log } from "../utils/logs";
import { color } from "@rneui/base";
import ButtonIcon from "../components/shared/ButtonIcon";

export const RinkListScreen = ({ }) => {
    const { rinks, favRinks, loading, error } = useRinks();
    const [isShowFav, setIsShowFav] = React.useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const colors = useColors();

    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (actionSheetRef && actionSheetRef.current)
            actionSheetRef.current?.show();
    }, [actionSheetRef.current]);

    const handleOnRinkPressed = (rink: Rink) => {
        navigation.navigate('RinkInformation', { rink });
    }

    const handleIsShowFav = () => {
        setIsShowFav(!isShowFav);
    }

    if (error) {
        return <SafeAreaView style={styles.container}>
            <Text>{error.message}</Text>
        </SafeAreaView>
    }

    if (loading) {
        return <SafeAreaView style={styles.container}>
            <ActivityIndicator style={{ marginVertical: 16 }} />
        </SafeAreaView>
    }



    return <>
        <MapRinkView onRinkPress={handleOnRinkPressed} />
        <SafeAreaView style={{ position: 'absolute', top: 24, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent' }} pointerEvents="box-none">
            <RinksFilters isMapVisible={false} />
            <ActionSheet
                ref={actionSheetRef}
                isModal={false}
                snapPoints={[30, 80]}
                gestureEnabled
                closable={false}
                backgroundInteractionEnabled
                disableDragBeyondMinimumSnapPoint
                drawUnderStatusBar
                containerStyle={{ backgroundColor: colors.background }}
            >
                <View style={styles.list}>
                    <View style={styles.row}>
                        <RinkCount style={styles.list} rinks={isShowFav ? favRinks : rinks} />
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                            {/* <Button
                                buttonStyle={{
                                    borderRadius: 30,
                                    width: 55,
                                    height: 55,
                                    backgroundColor: 'transparent',
                                }}
                                icon={{
                                    name: 'sort',
                                    type: 'material',
                                    color: colors.grey5,
                                }}
                                titleStyle={{ fontWeight: 'bold' }} onPress={handleIsShowFav}
                            /> */}
                            <Button
                                buttonStyle={{
                                    borderRadius: 30,
                                    width: 55,
                                    height: 55,
                                    backgroundColor: 'transparent',
                                }}
                                icon={{
                                    name: isShowFav ? 'favorite' : 'favorite-border',
                                    type: 'material',
                                    color: isShowFav ? 'pink' : colors.grey5,
                                }}
                                titleStyle={{ fontWeight: 'bold' }} onPress={handleIsShowFav}
                            />
                        </View>
                    </View>
                    <SkyList onRinkPress={handleOnRinkPressed} style={styles.list} rinks={isShowFav ? favRinks : rinks} />
                </View>
            </ActionSheet>
        </SafeAreaView >
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
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
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
