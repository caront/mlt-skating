
import { FunctionComponent } from "react";
import { useColors } from "../../colors";
import { ConditionAndLastUpdate } from "../../models/Rink";
import Chip from "../shared/Chip";
import React from "react";
import DayJs from "dayjs";
import { Icon } from "@rneui/themed";
import { DateFormat } from "../../utils/dateFormat";


const Cleared: FunctionComponent<{ condition: ConditionAndLastUpdate }> = ({ condition }) => {
    const colors = useColors();

    return <Chip
        title={condition.cleared ? 'Cleared' : 'Not Cleared'}
        subTitle={`last time Cleared ${DateFormat(condition.lastTimeCleared)}`}
        background={condition.cleared ? colors.primary : colors.disabled}
        icon={<Icon name={'cleaning-services'} size={15} color='white' type={'material-community-icons'} />}
        containerStyle={{ marginVertical: 5 }} />
}

export default Cleared;
