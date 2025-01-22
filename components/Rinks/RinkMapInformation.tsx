import React from 'react';
import { StyleSheet } from 'react-native';
import { Rink } from '../../models/Rink';
import { useColors } from '../../colors';
import BlurContainer from '../shared/BlurContainer';
import MapsViewImage from '../shared/MapsViewImage';
import DistrictChip from '../Districts/District';
import InformationContainer from '../shared/InformationContainer';
import { Icon } from '@rneui/themed';

interface RinkMapInformationProps {
    rink: Rink;
}

const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
        },
    })
}

export const RinkMapInformation: React.FC<RinkMapInformationProps> = ({ rink }) => {
    const styles = useStyles();
    return (
        <InformationContainer
            title={rink.district.name}
            titleIcon={<Icon name='map' size={20} color='white' type="material" />}
            titleBackground={useColors().primary}
            >
            <MapsViewImage label={rink.name} lat={rink.latitude} lng={rink.longitude} />
        </InformationContainer>
    );
}