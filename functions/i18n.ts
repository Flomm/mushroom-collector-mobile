import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import engTranslation from '../assets/i18n/en.json';
import huTranslation from '../assets/i18n/hu.json';

const deviceLanguage = getLocales()[0].languageCode;

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources: {
    hu: huTranslation,
    en: engTranslation
  },
  lng: deviceLanguage ?? 'en',
  fallbackLng: 'en'
});

export default i18n;
