
import { FunctionComponent } from "react";
import { useColors } from "../../colors";
import { ConditionAndLastUpdate } from "../../models/Rink";
import Chip from "../shared/Chip";
import React from "react";
import DayJs from "dayjs";
import { Icon } from "@rneui/themed";
import { DateFormat } from "../../utils/dateFormat";
import { useTranslation } from "react-i18next";


const Resurfaced: FunctionComponent<{ condition: ConditionAndLastUpdate }> = ({ condition }) => {
    const colors = useColors();
    const { t } = useTranslation();

    return <Chip
        title={t(`rink_details.resurfaced.${condition.resurfaced ? 'yes' : 'no'}`)}
        subTitle={t(`rink_details.resurfaced.since`, { date: DateFormat(condition.lastTimeResurfaced) })}
        background={condition.resurfaced ? colors.primary : colors.disabled}
        icon={<Icon name={'line-weight'} size={15} color='white' type={'material'} />}
        containerStyle={{ marginVertical: 5 }} />
}

export default Resurfaced;
