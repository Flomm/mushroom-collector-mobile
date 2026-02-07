import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)'
  ],
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts', 'jest-extended/all'],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'context/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'functions/**/*.{js,jsx,ts,tsx}',
    'navigation/**/*.{js,jsx,ts,tsx}',
    'state/**/*.{js,jsx,ts,tsx}'
  ]
};

export default config;
