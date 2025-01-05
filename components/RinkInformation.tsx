import React, { FunctionComponent } from "react";
import { Rink, RinkWithDistrictAndCondition } from "../models/Rink";
import { StyleSheet, Text, View } from "react-native";
import ConditionChip from "./shared/ConditionChip";
import { Row } from "./shared/Flex";
import DayJs from "dayjs";
import {useColors } from "../colors";
import Chip from "./shared/Chip";
import { Icon } from "@rneui/base";
import FontAnesome from 'react'
import MapsViewImage from "./shared/MapsViewImage";


interface RinkInformationProps {
    rink: RinkWithDistrictAndCondition;
}

interface PropertyProps {
    name: string;
    valueTrue: string;
    valueFalse: string;
    value: boolean;
}

const Open: FunctionComponent<{ rink: RinkWithDistrictAndCondition }> = ({ rink }) => {
    const colors = useColors();
    return <Chip
        title={rink.open ? 'Open' : 'Closed'}
        background={rink.open ? colors.accent.emeraldGreen : colors.accent.skatingRed}
        icon={<Icon name={rink.open ? 'ice-skating' : 'close'} size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}/>
}

const Cleared: FunctionComponent<{ rink: RinkWithDistrictAndCondition }> = ({ rink }) => {
    const colors = useColors();
    return <Chip
        title={rink.cleared ? 'Cleared' : 'Not Cleared'}
        background={rink.cleared ? colors.primary.midnightBlue : colors.primary.iceBlue}
        icon={<Icon name={rink.cleared ? 'cleaning-services' : 'close'} size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}/>
}

const Watered: FunctionComponent<{ rink: RinkWithDistrictAndCondition }> = ({ rink }) => {
    const colors = useColors();
    return <Chip
        title={rink.watered ? 'Watered' : 'Not Watered'}
        background={rink.watered ? colors.primary.midnightBlue : colors.primary.iceBlue}
        icon={<Icon name={rink.watered ? 'water' : 'close'} size={15} color='white' type={rink.watered ? 'entypo' : 'material'} />}
        containerStyle={{ marginVertical: 5 }}/>
}

const Resurfaced: FunctionComponent<{ rink: RinkWithDistrictAndCondition }> = ({ rink }) => {
    const colors = useColors();
    return <Chip
        title={rink.resurfaced ? 'Resurfaced' : 'Not Resurfaced'}
        background={rink.resurfaced ? colors.primary.midnightBlue : colors.primary.iceBlue}
        icon={<Icon name={rink.resurfaced ? 'check' : 'close'} size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}/>
}

const Neibordhoods: FunctionComponent<{ rink: RinkWithDistrictAndCondition }> = ({ rink }) => {
    const colors = useColors();
    if (!rink.district) return null;
    return <Chip
        title={rink.district}
        background={colors.primary.midnightBlue}
        icon={<Icon name='map' size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}/>
}


const RinkInformation: FunctionComponent<RinkInformationProps> = ({ rink }) => {
    const lastUpdateYesterday = DayJs(rink.lastUpdate).isBefore(DayJs().subtract(1, 'day'));

    return <View style={styles.container}>
        <View style={styles.row}>
            <Text style={styles.lastUpdate}>last updated { DayJs(rink.lastUpdate).format(lastUpdateYesterday ? 'YYYY-DD-MM HH:mm' : 'HH:mm')}</Text>
        </View>
        <View style={[styles.row, { justifyContent: 'flex-start', flexWrap: 'wrap', gap: 5 }]}>
            <Open rink={rink} />
            <ConditionChip condition={rink.condition} />
            <Cleared rink={rink} />
            <Watered rink={rink} />
            <Resurfaced rink={rink} />
            <Neibordhoods rink={rink} />
        </View>
        <View style={[styles.row]}>
            <MapsViewImage label={rink.name} lat={rink.coordinates.latitude} lng={rink.coordinates.longitude}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderRadius: 20,
        // borderWidth: 1,
        // borderBlockColor: 'black',
        // padding: 10
    },
    property: {
        fontWeight: 'bold'
    },
    propertyValue: {

    },
    lastUpdate: {
        color: 'gray',
        fontSize: 10,
    }

});

export default RinkInformation;