import React from 'react';
import { Rink, RinkWithDistrictAndConditionLastUpdate } from '../../models/Rink';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@rneui/themed';
import { useColors } from '../../colors';
import { color } from '@rneui/base';
import OpenChips from '../Conditions/OpenChips';

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
    })
}


const RinkInformations: React.FC<RinkInformationsProps> = ({ rink }) => {

    const styles = useStyles();
    const colors = useColors();

    return (
        <View style={styles.container}>
            <OpenChips condition={rink} />
        </View>
    );
}

export default RinkInformations;