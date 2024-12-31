import React, { FunctionComponent } from "react";
import { Place } from "../models/Place";
import { StyleSheet, Text, View } from "react-native";
import ConditionChip from "./shared/ConditionChip";
import { Row } from "./shared/Flex";
import DayJs from "dayjs";
import {useColors } from "../colors";
import Chip from "./shared/Chip";
import { Icon } from "@rneui/base";
import FontAnesome from 'react'
import MapsViewImage from "./shared/MapsViewImage";


interface PlaceInformationProps {
    place: Place;
}

interface PropertyProps {
    name: string;
    valueTrue: string;
    valueFalse: string;
    value: boolean;
}

const Open: FunctionComponent<{ place: Place }> = ({ place }) => {
    const colors = useColors();
    return <Chip
        title={place.open ? 'Open' : 'Closed'}
        background={place.open ? colors.accent.emeraldGreen : colors.accent.skatingRed}
        icon={<Icon name={place.open ? 'ice-skating' : 'close'} size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}/>
}

const Cleared: FunctionComponent<{ place: Place }> = ({ place }) => {
    const colors = useColors();
    return <Chip
        title={place.cleared ? 'Cleared' : 'Not Cleared'}
        background={place.cleared ? colors.primary.midnightBlue : colors.primary.iceBlue}
        icon={<Icon name={place.cleared ? 'cleaning-services' : 'close'} size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}/>
}

const Watered: FunctionComponent<{ place: Place }> = ({ place }) => {
    const colors = useColors();
    return <Chip
        title={place.watered ? 'Watered' : 'Not Watered'}
        background={place.watered ? colors.primary.midnightBlue : colors.primary.iceBlue}
        icon={<Icon name={place.watered ? 'water' : 'close'} size={15} color='white' type={place.watered ? 'entypo' : 'material'} />}
        containerStyle={{ marginVertical: 5 }}/>
}

const Resurfaced: FunctionComponent<{ place: Place }> = ({ place }) => {
    const colors = useColors();
    return <Chip
        title={place.resurfaced ? 'Resurfaced' : 'Not Resurfaced'}
        background={place.resurfaced ? colors.primary.midnightBlue : colors.primary.iceBlue}
        icon={<Icon name={place.resurfaced ? 'check' : 'close'} size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}/>
}

const Neibordhoods: FunctionComponent<{ place: Place }> = ({ place }) => {
    const colors = useColors();
    return <Chip
        title={place.neibordhoods.name}
        background={colors.primary.midnightBlue}
        icon={<Icon name='map' size={15} color='white' type="material" />}
        containerStyle={{ marginVertical: 5 }}/>
}

const PlaceInformation: FunctionComponent<PlaceInformationProps> = ({ place }) => {
    return <View style={styles.container}>
        <View style={styles.row}>
            <Text style={styles.lastUpdate}>last updated {DayJs(place.lastUpdate).format('HH:mm')}</Text>
        </View>
        <View style={[styles.row, { justifyContent: 'flex-start', flexWrap: 'wrap', gap: 5 }]}>
            <Open place={place} />
            <ConditionChip condition={place.condition} />
            <Cleared place={place} />
            <Watered place={place} />
            <Resurfaced place={place} />
            <Neibordhoods place={place} />
        </View>
        <View style={[styles.row]}>
            <MapsViewImage label={place.name} lat={place.locations.lat} lng={place.locations.lng}/>
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

export default PlaceInformation;