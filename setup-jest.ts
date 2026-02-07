jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (i18nKey: string) => i18nKey,
    i18n: {
      changeLanguage: () => new Promise(() => {})
    }
  }),
  Trans: () => 'Trans',
  initReactI18next: {
    type: '3rdParty',
    init: () => {}
  }
}));

jest.mock('expo-svg-uri', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    __esModule: true,
    default: ({ testID }: { testID?: string }) => React.createElement(View, { testID })
  };
});
