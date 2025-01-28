import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";
import React, { useEffect } from "react";

const resources = {
  en: {
    translation : en
  },
  fr:{
    translation: fr
  }
};

const initalizeI18Next = () => {
  i18n.use(initReactI18next).init({
    debug: true,
    resources,
    lng: "fr",
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const I18NProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => {
    initalizeI18Next();
  }, []);
  return <>{children}</>
};
