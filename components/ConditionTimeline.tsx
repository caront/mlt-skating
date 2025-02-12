import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ConditionChanges } from "../models/ConditionHistory";
import { useColors } from "../colors";
import Circle from "./shared/Circle";
import { Condition, ECondition } from "../models/Rink";
import dayjs, { Dayjs } from "dayjs";
import { Icon } from "@rneui/themed";


type ConditionTimeLineProps = {
    conditions: Condition[];
};

const ConditionTimeLine: React.FC<ConditionTimeLineProps> = ({ conditions }) => {
    const colors = useColors();

    const conditionColor = (condition: ECondition) => {
        switch (condition) {
            case ECondition.Excellente:
                return colors.success;
            case ECondition.Good:
                return colors.warning;
            case ECondition.Bad:
                return colors.error;
            default:
                return colors.grey3;
        }
    }
    const renderItem = ({ item }: { item: Condition }) => {

        return (
            <View style={styles.ConditionTimeLineItem}>
                {/* Vertical Line */}
                <View style={[styles.line]} />


                {/* Marker and Properties */}
                <View style={styles.markerContainer}>
                    <View style={{flexDirection: 'row', gap: 5}}>
                        <Circle color={item.open ? colors.success : colors.error} size={20} />
                        <Icon
                            containerStyle={{ backgroundColor: conditionColor(item.iceQuality), height: 20, width: 20, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
                            name={'snowflake-4'} size={12} color='white' type={'fontisto'} />
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.date}>{dayjs(item.updatedAt).format('YYYY-DD-MM')}</Text>
                        <Text style={styles.date}>{dayjs(item.updatedAt).format('HH:mm')}</Text>

                        <View style={{ flexDirection: 'row', gap: 5, flexWrap: 'wrap' }}>
                            {item.resurfaced && <Icon
                                containerStyle={{ backgroundColor: colors.secondary, height: 20, width: 20, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
                                name={'view-headline'} size={12} color='white' type={'material-community-icons'} />
                            }
                            {item.cleared && <Icon
                                containerStyle={{ backgroundColor: colors.secondary, height: 20, width: 20, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
                                name={'cleaning-services'} size={12} color='white' type={'material-community-icons'} />
                            }
                            {item.watered && <Icon
                                containerStyle={{ backgroundColor: colors.secondary, height: 20, width: 20, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
                                name={'water-drop'} size={12} color='white' type={'material-community-icons'} />
                            }
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={conditions}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
        />
    );
};

export default ConditionTimeLine;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    ConditionTimeLineItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    line: {
        width: '100%',
        height: 4,
        backgroundColor: "#CCC",
        flex: 1,
    },
    markerContainer: {
        flexDirection: "column",
        gap: 2,
    },
    marker: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#FFF",
        backgroundColor: "#BBB",
        marginBottom: 5,
    },
    details: {
        marginLeft: 0,
        gap: 2
    },
    date: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    property: {
        fontSize: 16,
        color: "#333",
    },
});
