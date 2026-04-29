import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

let initialized = false;

type Translations = Record<string, Record<string, string>>;


const initI18n = (lng: string, translations: Translations) => {
  if (!initialized) {
    const resources = Object.entries(translations).reduce((acc, [lang, data]) => {
      acc[lang] = { translation: data };
      return acc;
    }, {} as Record<string, { translation: Record<string, string> }>);

    i18next
      .use(initReactI18next)
      .init({
        resources,
        lng,
        fallbackLng: 'cn',
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    initialized = true;
  } else {
    i18n.changeLanguage(lng);
  }
};

export default initI18n;
