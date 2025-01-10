import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Pressable, SafeAreaView } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { useColors } from '../colors';
import { color, Icon } from '@rneui/base';
import Chip from './shared/Chip';
import { getDistrict } from '../data/rinks';
import { District } from '../models/Rink';
import { useDistricts } from '../hooks/UseDistricts';


interface DistrictSelectorProps {
    onSelect: (selectedDistrict: string[]) => void;
}

const useStyles = () => {
    const colors = useColors();
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 2,
            rowGap: 2,
        },
        label: {
            fontSize: 16,
            marginBottom: 10,
        },
        centeredView: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',

        },
        list: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
            rowGap: 2,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            margin: 10,
        },
        buttonOpen: {
            backgroundColor: colors.primary.midnightBlue,
        },
        buttonClose: {
            backgroundColor: colors.primary.midnightBlue,
        },
        textStyle: {
            color: colors.primary.snowWhite,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
        },
        selectedList: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 5,
            rowGap: 2,
        },
        selectedDistrict: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
            gap: 5,
            color: colors.neutral.charcoal,
            backgroundColor: colors.primary.snowWhite
        }
    });
    return styles;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({ onSelect }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { districts, getDistrict } = useDistricts();
    const [selectedDistrict, setSelectedDistrict] = useState<string[]>([]);
    const colors = useColors();
    const styles = useStyles();
    const handleSelect = (itemValue: string) => {
        if (selectedDistrict.includes(itemValue)) {
            setSelectedDistrict(selectedDistrict.filter((district) => district !== itemValue));
            return;
        }
        setSelectedDistrict([...selectedDistrict, itemValue]);
    };

    React.useEffect(() => {
        onSelect(selectedDistrict);
    }, [selectedDistrict]);

    const hasDistricts = selectedDistrict.length > 0;

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setModalVisible(true)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={styles.label}>Filter by Districts</Text>
                <Icon name='edit' type="material" />
            </Pressable>
            {hasDistricts &&
                <View style={styles.selectedList}>
                    {selectedDistrict.map((district, index) => (
                        <View key={index} style={styles.selectedDistrict}>
                            <Text >{getDistrict(district)?.name}</Text>
                            <Icon
                                name="close"
                                type="material"
                                color={colors.primary.midnightBlue}
                                onPress={() => setSelectedDistrict(selectedDistrict.filter((selected) => selected !== district))}
                            />
                        </View>
                    ))}
                </View>}
            {!hasDistricts &&
                <View>
                    <Text style={{ color: colors.neutral.charcoal }}>Select Districts</Text>
                </View>}
            <Modal
                style={styles.modalView}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <SafeAreaView style={styles.centeredView}>
                    <ScrollView>
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.textStyle}>Done</Text>
                        </Pressable>
                        <View style={styles.list}>
                            {districts.map((district, index) => (
                                <CheckBox
                                    containerStyle={styles.selectedDistrict}
                                    key={index}
                                    title={district.name}
                                    iconType="material"
                                    checkedColor={colors.primary.midnightBlue}
                                    uncheckedIcon='check-box-outline-blank'
                                    checkedIcon="check-box"
                                    checked={selectedDistrict.includes(district.id)}
                                    onPress={() => handleSelect(district.id)}
                                />
                            ))}
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </Modal>

        </View>
    );
};


export default DistrictSelector;