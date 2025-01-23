
import { FunctionComponent } from "react";
import { conditionColor, useColors } from "../../colors";
import { ConditionAndLastUpdate } from "../../models/Rink";
import Chip from "../shared/Chip";
import React from "react";
import DayJs from "dayjs";
import { Icon } from "@rneui/themed";
import { DateFormat } from "../../utils/dateFormat";


const IceConditions: FunctionComponent<{ condition: ConditionAndLastUpdate }> = ({ condition }) => {
    const conditionsColor = conditionColor(condition.condition);
    return <Chip
        title={'Ice Condition'}
        subTitle={condition.condition.toLocaleLowerCase()}
        background={conditionsColor}
        icon={<Icon name={'snowflake-4'} size={15} color='white' type={'fontisto'} />}
        containerStyle={{ marginVertical: 5 }} />
}

export default IceConditions;
