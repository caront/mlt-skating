import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SearchBar, Switch } from "@rneui/themed";
import { UseFetchPlacesProps } from "../hooks/UseFetchPlaces";
import { Filters } from '../hooks/UsePlaceFilter';
import { Icon } from '@rneui/themed';


interface SkyListSearchProps {
    searchProp: Filters;
    onSearchPropChanged: (searchProp: UseFetchPlacesProps) => void;
}

const SkyListSearch = ({ searchProp, onSearchPropChanged }: SkyListSearchProps) => {
    const [isExtended, setIsExtended] = useState(false);

    const handleSearchTermChanged = (search: string) => {
        onSearchPropChanged({ ...searchProp, searchTerm: search });
    };

    return (
        <View style={{ ...styles.container }}>
            <View style={styles.row}>
                <SearchBar
                    platform="ios"
                    searchIcon={<Icon name="ice-skating" type='material' />}
                    clearIcon={<Icon name="close" type='material' />}
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInputContainer}
                    onChangeText={handleSearchTermChanged}
                    placeholder="Search for a place..."
                    placeholderTextColor="#888"
                    value={searchProp.searchTerm}
                />
                <TouchableOpacity onPress={() => setIsExtended(true)} >
                    <Text >{isExtended ? '-' : '+'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    searchBarContainer: {

    },
    searchBarInputContainer: {
    },
    drawerContent: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default SkyListSearch;