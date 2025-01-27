import React from 'react';
import { Button } from '@rneui/themed'
import { useColors } from '../../colors';



type ButtonIconProps = {
    height: number;
    width: number;
    icon: {
        name: string;
        color: string;
        type: string;
    }
    onPress: () => void;
};


const ButtonIcon: React.FC<ButtonIconProps> = ({ height, width, icon, onPress }) => {
    const colors = useColors();
    return (
        <Button
            buttonStyle={{
                borderRadius: 30,
                width,
                height,
                backgroundColor: colors.white,
            }}
            icon={icon}
            titleStyle={{ fontWeight: 'bold' }} onPress={onPress}
        />

    );
}

export default ButtonIcon;
