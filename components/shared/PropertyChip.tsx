import React from "react";
import { StyleSheet } from "react-native";
import { useColors } from "../../colors";
import { View } from "react-native";
import { Icon } from "@rneui/themed";
import { Text } from "react-native";

interface PropertyChipProps {
    property: string;
    type: 'tall' | 'small';
    background: string;
    icon: string;
    typeIcon: string;
    activated: boolean;
    value: string | null;
    style: 'full' | 'half';
}

const useStyles = (color: string, activated: boolean) => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            paddingVertical: 10,
            fontSize: 20,
            borderRadius: 40,
            color: colors.grey5,
            backgroundColor: color,
        },
        activated: {

        },
        notActivated: {
        },
        label: {
            color: activated ? colors.white : colors.grey5,
            fontSize: 16
        },
        icon: {
            color,
            // backgroundColor: colors.white
        },
        circle: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: 25,
            height: 25,
            borderRadius: 30,
            marginRight: 10,
            color,
            backgroundColor: colors.white
        },
    });
}


const PropertyChip: React.FC<PropertyChipProps> = ({ property, activated, type, background, icon, typeIcon }) => {
    const colors = useColors();
    const styles = useStyles(background, activated);

    return <View style={[styles.container]}>
        <View style={styles.circle}>
            <Icon name={icon} type={typeIcon} />
        </View>
        <Text style={styles.label}>{property}</Text>
    </View>
}

const PropertyChipSmall: React.FC<PropertyChipProps> = ({ property, activated, type, background, icon, typeIcon }) => {
    const colors = useColors();
    const styles = useStyles(background, activated);

    return <View style={[styles.container]}>
        <View style={styles.circle}>
            <Icon name={icon} type={typeIcon} />
        </View>
        <Text style={styles.label}>{property}</Text>
    </View>
}


export default PropertyChip;

