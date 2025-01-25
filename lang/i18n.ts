import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";

const resources = {
  en: en,
  fr: fr,
};

i18n.use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: "en", // default language to use.
  });

export default { i18n };
