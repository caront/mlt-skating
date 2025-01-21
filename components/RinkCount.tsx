import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { useColors } from '../colors';
import { useRinks } from '../hooks/UseRinks';


const useStyles = () => {
    const colors = useColors();


    return StyleSheet.create({
        rinkNumber: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.grey5,
        }
    });
}


const RinkCount: React.FC<{style: StyleProp<ViewStyle>}> = ({style}) => {
    const { rinks } = useRinks();
    const styles = useStyles();
    return <Text style={[style, styles.rinkNumber]}>{rinks.length === 0 ? 'No Rink' : `${rinks.length} Rinks`}</Text>
}

export default RinkCount;