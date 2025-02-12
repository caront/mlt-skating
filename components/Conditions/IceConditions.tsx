
import { FunctionComponent } from "react";
import { conditionColor, useColors } from "../../colors";
import { ConditionAndLastUpdate } from "../../models/Rink";
import Chip from "../shared/Chip";
import React from "react";
import DayJs from "dayjs";
import { Icon } from "@rneui/themed";
import { DateFormat } from "../../utils/dateFormat";
import { useTranslation } from "react-i18next";


const IceConditions: FunctionComponent<{ condition: ConditionAndLastUpdate }> = ({ condition }) => {
    const { t } = useTranslation();
    const conditionsColor = conditionColor(condition.iceQuality);

    return <Chip
        title={t('rink_details.ice_quality_title')}
        subTitle={t(`rink_details.ice_quality.${condition.iceQuality}`)}
        background={conditionsColor}
        icon={<Icon name={'snowflake-4'} size={15} color='white' type={'fontisto'} />}
        containerStyle={{ marginVertical: 5 }} />
}

export default IceConditions;
