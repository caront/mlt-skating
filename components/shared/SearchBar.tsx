import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { useColors } from "../../colors";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { BlurView } from "@react-native-community/blur";
import { useTheme } from "@react-navigation/native";

interface SearchBarProps {
    blur: boolean;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    // setClicked: (clicked: boolean) => void;
}


const useStyles = () => {
    const colors = useColors();
    return StyleSheet.create({
        container: {
            margin: 0,
            display: "flex",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            height: 55,
            borderRadius: 30,
            paddingHorizontal: 20,
        },
        input: {
            fontSize: 20,
            marginLeft: 10,
            flex: 1,
            color: colors.grey5,
        },
        clearIcon: {
            flex: 4,
            color: colors.grey5,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"
        }
    });
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder, blur: blueEnable }) => {
    const styles = useStyles();
    const colors = useColors();
    const isDarkMode = useTheme().dark;

    const showClearIcon = value !== "" && value !== undefined && value !== null;
    return (
        <View style={styles.container}>
            {blueEnable && <BlurView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '115%',
                    height: 55,
                    borderRadius: 30,
                }}
                blurType={isDarkMode ? 'dark' : 'light'}
                blurAmount={10}
                reducedTransparencyFallbackColor={colors.primary}
            />}
            <Icon
                name="search"
                size={20}
                color={colors.grey5}
                type='material'
                style={{ marginLeft: 1 }}
            />
            <TextInput
                style={[styles.input]}
                placeholderTextColor={colors.grey3}
                placeholder={placeholder ? placeholder : "Search..."}
                value={value}
                onChangeText={onChangeText}
            />
            {showClearIcon && (
                <Icon name="close" type='material' size={20} color={colors.grey5} style={styles.clearIcon} onPress={() => {
                    onChangeText("")
                }} />
            )}
        </View>

    );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({

});