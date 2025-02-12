import i18n, { init } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";
import React, { useEffect } from "react";
import { Platform, NativeModules } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getSavedLanguage } from "../utils/i18nHelper";

const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
};

const initalizeI18Next = (language: 'fr' | 'en') => {
  console.log("initalizeI18Next", language);
  i18n.use(initReactI18next).init({
    debug: true,
    resources,
    lng: language,
    fallbackLng: "fr",
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const I18NProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => {
    getSavedLanguage().then((language: string) => {
      initalizeI18Next(language as 'fr' | 'en');
    });
  }, []);
  return <>{children}</>
};
