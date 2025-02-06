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
import OpenChips from "../Conditions/OpenChips";
import { useTranslation } from "react-i18next";

interface RinkConditionsProps {
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


const RinkConditions: FunctionComponent<RinkConditionsProps> = ({ rink }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const colors = useColors();

    return <InformationContainer
        title={t("rink_details.conditions")}
        titleIcon={<Icon name='snowshoeing' size={20} color={colors.grey0} type="material" />}
    >
        {/* <OpenChips condition={rink} /> */}
        <IceConditions condition={rink} />
        <Cleared condition={rink} />
        <Watered condition={rink} />
        <Resurfaced condition={rink} />
    </InformationContainer>
}


export default RinkConditions;