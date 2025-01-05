import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Pressable, SafeAreaView } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { useColors } from '../colors';
import { color, Icon } from '@rneui/base';
import Chip from './shared/Chip';
import { getDistrict } from '../data/rinks';
import { District } from '../models/Rink';


interface DistrictSelectorProps {
    districts: District[];
    onSelect: (selectedDistrict: string[]) => void;
}

const useStyles = () => {
    const colors = useColors();
    const styles = StyleSheet.create({
        container: {
            margin: 20,
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
            backgroundColor: colors.primary.iceBlue,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 1,
        }
    });
    return styles;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({ districts, onSelect }) => {
    const [modalVisible, setModalVisible] = useState(false);
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

    return (
        <View style={styles.container}>
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
                                    key={index}
                                    title={district.district}
                                    iconType="material"
                                    checkedColor={colors.primary.midnightBlue}
                                    uncheckedIcon='check-box-outline-blank'
                                    checkedIcon="check-box"
                                    checked={selectedDistrict.includes(district.districtAbv)}
                                    onPress={() => handleSelect(district.districtAbv)}
                                />
                            ))}
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </Modal>
            <View style={styles.selectedList}>
                {selectedDistrict.map((district, index) => (
                    <View key={index} style={styles.selectedDistrict}>
                        <Text >{getDistrict(district).district}</Text>
                        <Icon
                            name="close"
                            type="material"
                            color={colors.primary.midnightBlue}
                            onPress={() => setSelectedDistrict(selectedDistrict.filter((selected) => selected !== district))}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.selectedList}>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Select Districts</Text>
                </Pressable>
            </View>
        </View>
    );
};


export default DistrictSelector;