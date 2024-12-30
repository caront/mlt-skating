import React from "react";
import { Condition } from "../../models/Place";
import { View } from "react-native";
import Chip from "./Chip";
import { Icon } from "@rneui/base";
import { useColors } from "../../colors";


interface ConditionChipProps {
    condition: Condition;
}



const ConditionChip: React.FC<ConditionChipProps> = ({ condition }) => {
    const colors = useColors();

    if (condition === Condition.NA) {
        return <View />;
    }

    return <Chip
        title={condition}
        background={condition === Condition.Excellente ? colors.accent.emeraldGreen : condition === Condition.Good ? colors.accent.goldenYellow : colors.accent.skatingRed}
        icon={<Icon name={condition === Condition.Excellente ? 'check' : condition === Condition.Good ? 'check' : 'close'} size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}
    />;
};

export default ConditionChip;