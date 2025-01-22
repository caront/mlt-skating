import React, { FunctionComponent } from "react";
import { Condition, ConditionAndLastUpdate, ConditionLastUpdate, Rink, RinkWithCondition, RinkWithDistrictAndConditionLastUpdate } from "../../models/Rink";
import { StyleSheet, Text, View } from "react-native";
import ConditionChip from "../shared/ConditionChip";
import { Row } from "../shared/Flex";
import DayJs from "dayjs";
import { openColor, useColors } from "../../colors";
import Chip from "../shared/Chip";
import { Icon } from "@rneui/base";
import FontAnesome from 'react'
import MapsViewImage from "../shared/MapsViewImage";
import PropertyChip from "../shared/PropertyChip";
import Circle from "../shared/Circle";
import { BlurView } from '@react-native-community/blur';
import { useTheme } from "@react-navigation/native";
import BlurContainer from "../shared/BlurContainer";
import InformationContainer from "../shared/InformationContainer";
import Cleared from "../Conditions/Cleared";
import Resurfaced from "../Conditions/Resurfaced";
import Watered from "../Conditions/Wather";
import IceConditions from "../Conditions/IceConditions";

interface RinkInformationProps {
    rink: RinkWithDistrictAndConditionLastUpdate;
}

const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
        },
        lastUpdate: {
            fontSize: 12,
            color: 'grey',
        },
        propertyContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 5,
            color: colors.grey5,
            padding: 10,
        }
    });
}

const Open: FunctionComponent<{ rink: RinkWithDistrictAndConditionLastUpdate }> = ({ rink }) => {
    const colors = useColors();
    const styles = useStyles();

    return <View style={styles.propertyContainer} >

        <View style={[styles.row, { gap: 5, justifyContent: 'flex-start' }]}>
            <Text style={{ fontSize: 20 }} >{rink.open ? 'Open' : 'Close'}</Text>
            <Circle color={rink.open ? colors.success : colors.error} size={15} />
        </View>
        <Text style={{ fontSize: 12, color: colors.grey4 }}>Since {DayJs(rink.openSince).format('YYYY-MM-DD HH:mm')}</Text>
    </View>
}

const Neibordhoods: FunctionComponent<{ rink: RinkWithCondition }> = ({ rink }) => {
    const colors = useColors();
    if (!rink.district) return null;
    return <Chip
        title={rink.district.name}
        background={colors.primary}
        icon={<Icon name='map' size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }} />
}


const RinkInformation: FunctionComponent<RinkInformationProps> = ({ rink }) => {
    const styles = useStyles();

    return <InformationContainer
        title={"Informations"}
        titleBackground={openColor(rink.open)}
        titleIcon={<Icon name='snowshoeing' size={20} color='white' type="material" />}
    >
        <Open rink={rink} />
        <IceConditions condition={rink} />
        <Cleared condition={rink} />
        <Watered condition={rink} />
        <Resurfaced condition={rink} />
    </InformationContainer>
}


export default RinkInformation;