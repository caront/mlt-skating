import { Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Platform } from "react-native";
import { useColors } from "../../colors";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { BlurView } from "@react-native-community/blur";
import { useTheme } from "@react-navigation/native";
import { useDebounce } from "use-debounce";
import { useRink } from "../../hooks/UseRink";
import { useRinks } from "../../hooks/UseRinks";
import { useTranslation } from "react-i18next";

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

const SearchBar: React.FC = ({ }) => {
    const { t } = useTranslation();
    const { dispatch } = useRinks();
    const styles = useStyles();
    const colors = useColors();
    const isAndroid = Platform.OS === 'android';
    const [text, setText] = useState("");
    const [debouncedText] = useDebounce(text, 250);
    const showClearIcon = debouncedText !== "" && debouncedText !== undefined && debouncedText !== null;

    const handleSearchTermChanged = (search: string) => {
        dispatch({ type: 'SEARCH_RINK_NAME', payload: search });
    };

    useEffect(() => {
        handleSearchTermChanged(debouncedText);
    }, [debouncedText]);
  return (
        <View style={[styles.container, isAndroid ? { backgroundColor: colors.white, borderRadius: 30 } : {}]}>
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
                placeholder={t('search.search_placeholder')}
                value={text}
                onChangeText={setText}
            />
            {showClearIcon && (
                <Icon name="close" type='material' size={20} color={colors.grey5} style={styles.clearIcon} onPress={() => {
                    setText("")
                }} />
            )}
        </View>

    );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({

});