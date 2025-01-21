import React from 'react';
import { Rink } from '../models/Rink';
import BlurIconButton from './shared/BlurButton';
import { useColors } from '../colors';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { saveFavoriteStatus } from '../utils/favoritesUtils';
import { useRinks } from '../hooks/UseRinks';

interface FavButtonProps {
    rink: Rink;
}

const FavButton: React.FC<FavButtonProps> = ({ rink }) => {
    const [isFav, setIsFav] = React.useState(rink.isFav);
    const { setRinkFavorite } = useRinks();
    const colors = useColors();
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePress = () => {
        scale.value = withSpring(isFav ? 0.8 : 1.2, {
        }, () => {
            scale.value = withSpring(1);
        });
        setRinkFavorite(rink.id, !isFav)
        setIsFav(!isFav);
    };

    return <Animated.View style={animatedStyle}>
        <BlurIconButton
            height={55}
            width={55}
            blur={true}
            onPress={handlePress}
            icon={{
                name: isFav ? 'favorite' : 'favorite-border',
                type: 'material',
                color: isFav ? 'pink' : colors.grey5,
            }} />
    </Animated.View>
}

export default FavButton;