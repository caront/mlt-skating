
import React, { FunctionComponent } from "react";
import { useColors } from "../../colors";
import { District, RinkWithCondition } from "../../models/Rink";
import Chip from "../shared/Chip";
import { Icon } from "@rneui/themed";

const DistrictChip: FunctionComponent<{ district: District }> = ({ district }) => {
    const colors = useColors();
    if (!district) return null;
    return <Chip
        title={district.name}
        background={colors.primary}
        icon={<Icon name='map' size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }} />
}

export default DistrictChip;