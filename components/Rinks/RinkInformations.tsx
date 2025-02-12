import React, { useTransition } from 'react';
import { Rink, RinkWithDistrictAndConditionLastUpdate } from '../../models/Rink';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@rneui/themed';
import { useColors } from '../../colors';
import OpenChips from '../Conditions/OpenChips';
import InformationContainer from '../shared/InformationContainer';
import Chip from '../shared/Chip';
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { decode } from 'html-entities';
import { getI18nField } from '../../utils/i18nHelper';

interface RinkInformationsProps {
    rink: RinkWithDistrictAndConditionLastUpdate;
}

const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            color: colors.grey5,
        },
        information: {
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            color: colors.grey5,
            paddingHorizontal: 10,
            textAlign: 'justify',
            fontSize: 16,
        }
    })
}

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]

const RinkInformations: React.FC<RinkInformationsProps> = ({ rink }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const colors = useColors();

    const today = dayjs().get('day');
    const todayName = days[today];

    const hasService = (rink.services ?? []).length > 0;
    const hasSchedules = (rink.schedules ?? []).length > 0;

    const scheduleValue = rink.schedules?.find((schedule) => schedule.dayOfWeek === todayName);

    return (
        <>
            <View style={styles.container}>
                <OpenChips condition={rink} />
            </View>
            <InformationContainer
                title={getI18nField(rink, "description")}
                titleIcon={<Icon name='ice-skating' size={20} color={colors.grey0} type="material" />}
            >
                <Text style={styles.information}>{decode(getI18nField(rink, 'information'))}</Text>
                {hasService && <Chip containerStyle={{ paddingHorizontal: -10 }} title={t('services')} subTitle={rink.services?.map(service => t(`services_enum.${service}`)).join(' - ')} />}
                {hasSchedules && <Chip containerStyle={{ paddingHorizontal: -10 }} title={t('schedules')} subTitle={`${scheduleValue?.opens} - ${scheduleValue?.closes}`} />}
            </InformationContainer>

        </>

    );
}

export default RinkInformations;