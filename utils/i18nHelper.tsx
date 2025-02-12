import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next"


export const getI18nField = (obj: any, key: string) => {
    const { i18n } = useTranslation();
    const sufix = i18n.language === 'fr' ? '_fr' : '_en';
    if (obj[key + sufix]) {
        return obj[key + sufix];
    }
    return obj[key];
}

export const setSavedLanguage = async (language: string) => {
    await AsyncStorage.setItem('LANGUAGE', language);
}

export const getSavedLanguage = async () => {
    const language = await AsyncStorage.getItem('LANGUAGE');
    return language ?? 'fr';
}