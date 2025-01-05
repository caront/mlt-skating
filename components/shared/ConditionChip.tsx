import React from "react";
import { Condition, ECondition } from "../../models/Rink";
import { View } from "react-native";
import Chip from "./Chip";
import { Icon } from "@rneui/base";
import { useColors } from "../../colors";


interface ConditionChipProps {
    condition: ECondition;
}



const ConditionChip: React.FC<ConditionChipProps> = ({ condition }) => {
    const colors = useColors();

    if (condition === ECondition.NA) {
        return <View />;
    }

    return <Chip
        title={condition}
        background={condition === ECondition.Excellente ? colors.accent.emeraldGreen : condition === ECondition.Good ? colors.accent.goldenYellow : colors.accent.skatingRed}
        icon={<Icon name={condition === ECondition.Excellente ? 'check' : condition === ECondition.Good ? 'check' : 'close'} size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}
    />;
};

export default ConditionChip;