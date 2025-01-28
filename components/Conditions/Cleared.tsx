
import { FunctionComponent } from "react";
import { useColors } from "../../colors";
import { ConditionAndLastUpdate } from "../../models/Rink";
import Chip from "../shared/Chip";
import React from "react";
import DayJs from "dayjs";
import { Icon } from "@rneui/themed";
import { DateFormat } from "../../utils/dateFormat";
import { useTranslation } from "react-i18next";


const Cleared: FunctionComponent<{ condition: ConditionAndLastUpdate }> = ({ condition }) => {
    const colors = useColors();
    const { t } = useTranslation();

    return <Chip
        title={t(`rink_details.cleared.${condition.cleared ? 'yes' : 'no'}`)}
        subTitle={t(`rink_details.cleared.since`, { date: DateFormat(condition.lastTimeCleared) })}
        background={condition.cleared ? colors.primary : colors.disabled}
        icon={<Icon name={'cleaning-services'} size={15} color='white' type={'material-community-icons'} />}
        containerStyle={{ marginVertical: 5 }} />
}

export default Cleared;
