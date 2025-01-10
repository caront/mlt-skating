import React, { FunctionComponent } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, RefreshControl } from 'react-native';
import { Rink, RinkWithDistrictAndCondition } from '../models/Rink';
import { useColors } from '../colors';
import { useRinks } from '../hooks/UseRinks';

interface RinkListProps {
    onRinkPress: (rink: RinkWithDistrictAndCondition) => void;
    style?: StyleProp<ViewStyle>
}

const useStyles = () => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            gap: 10,
        },
        card: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 1,
            padding: 10,
        },
        circle: {
            width: 20,
            height: 20,
            borderRadius: 10,
            marginRight: 10,
        },
        column: {
            flexDirection: 'column',
        },
        rinkName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.neutral.charcoal,
        },
        rinkNumber:
        {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.neutral.charcoal,
        },
        district: {
            fontSize: 14,
            color: colors.neutral.charcoal,
        }
    });
}

const RinkList: FunctionComponent<RinkListProps> = ({ onRinkPress, style }) => {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { rinks, refresh } = useRinks();
    const colors = useColors();
    const styles = useStyles();
    const onRinkListRefresh = () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        refresh();
    }

    React.useEffect(() => {
        setIsRefreshing(false);
    }, [rinks]);

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.rinkNumber}>{rinks.length === 0 ? 'No Rink' : `${rinks.length} Rinks`}</Text>

            <FlatList
                data={rinks}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                keyExtractor={(item) => item.id}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={isRefreshing}
                //         onRefresh={onRinkListRefresh}
                //         colors={['grey']}
                //         progressBackgroundColor={'black'}
                //     />
                // }
                renderItem={({ item: rink }) => (
                    <TouchableOpacity onPress={() => onRinkPress(rink)} style={styles.card}>
                        <View style={[styles.circle, { backgroundColor: rink.open ? colors.accent.emeraldGreen : colors.accent.skatingRed }]} />
                        <View style={styles.column}>
                            <Text style={styles.rinkName}>{rink.name}</Text>
                            <Text style={styles.district}>{rink.district.name}</Text>
                        </View>
                    </TouchableOpacity>

                )}
            />
        </View>
    );
};


export default RinkList;