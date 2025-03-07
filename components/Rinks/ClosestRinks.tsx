import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { conditionColor, useColors } from "../../colors";
import InformationContainer from "../shared/InformationContainer";
import useClosestRinks from "../../hooks/UseClosestRinks";
import { FlatList } from "react-native-actions-sheet";
import { Rink, RinkWithCondition } from "../../models/Rink";
import { Icon } from "@rneui/themed";
import { RinkCondition } from "../../backend/supabase/functions/dataProcess/utils";
import { useTranslation } from "react-i18next";
import Circle from "../shared/Circle";
import { getI18nField } from "../../utils/i18nHelper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RinkInformationScreenProps, RootStackParamList } from "../../screens/types";


interface ClosestRinksProps {
    rink: Rink;
}

const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            gap: 10,
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: colors.white,
            borderRadius: 16,
            padding: 10,
        },
        left: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'flex-start',
        },
        right: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            marginRight: 10,
            marginBottom: 10,
            color: colors.grey1,
        },
        column: {
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'flex-start',
        },
        rinkName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.grey5,
        },
        rinkNumber:
        {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.grey5,
        },
        district: {
            fontSize: 12,
            color: colors.grey5,
        },
        rinkDecription: {
            fontSize: 14,
            color: colors.grey5,
        },
        absolute: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: 8,
        },
        test: {
            position: "absolute",
            height: '2%',
            width: '100%',
            bottom: 2,
            left: 2,
            borderRadius: 10,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    })
}




export const RinkItemList = ({ rink, onRinkPress }: { rink: RinkWithCondition, onRinkPress: (rink: Rink) => void }) => {
    const { t } = useTranslation();
    const colors = useColors();
    const styles = useStyles();


    const handlePress = () => {
        onRinkPress(rink);
    };

    const randomRotation = Math.floor(rink.id * 10) - 60;

    try {
        return <TouchableOpacity onPress={handlePress} style={styles.card}>
            {rink.isFav &&
                <View style={[styles.absolute, styles.right]}>
                    <Icon name="favorite" iconStyle={{ color: 'pink', transform: [{ rotate: `${randomRotation}deg` }], }} type='material' />
                </View>
            }
            <Text style={styles.rinkName}>{getI18nField(rink, 'description')}</Text>
            <Text style={styles.rinkDecription}>{rink.name}</Text>
            <View style={styles.row}>
                <View style={[styles.row, { gap: 5 }]}>
                    <Text>{t(rink.open ? 'open' : 'close')}</Text>
                    <Circle color={rink.open ? colors.success : colors.error} size={10} />
                </View>
                <View style={[styles.row, { gap: 5 }]}>
                    <Text>{t(`rink_details.ice_quality.${rink.iceQuality}`)}</Text>
                    <Circle color={conditionColor(rink.iceQuality)} size={10} />
                </View>
            </View>
        </TouchableOpacity>
    }
    catch (error) {
        console.error(error);
    }
    return null;
}

const ClosestRinks: React.FC<ClosestRinksProps> = ({ rink }) => {
    const navigation = useNavigation<RinkInformationScreenProps>();
    const styles = useStyles();
    const colors = useColors();
    const { t } = useTranslation();
    const { loading, error, rinks } = useClosestRinks({ rinkId: rink.id });


    const handleOnRinkPress = (pressedRink: Rink) => {
        navigation.push("RinkInformationScreen", { rink: pressedRink });
    }

    const hasClosestRinks = rinks.length > 0;
    if (loading || error)
        return null;

    return (
        <InformationContainer
            title={t('closest_rinks_title')}
            titleIcon={<Icon name='ice-skating' size={20} color={colors.grey0} type="material" />}
        >
            <>
                {!hasClosestRinks &&
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, padding: 28 }}>
                        <Icon name="snowflake" type="fontisto" size={23} color={colors.grey3} />
                        <Text style={{ color: colors.grey3 }}>{t('closest_rinks_zero')}</Text>
                    </View>}
                {rinks.map((r, index) => <RinkItemList key={index} rink={r} onRinkPress={handleOnRinkPress} />)}
            </>

        </InformationContainer>
    )
}

export default ClosestRinks;