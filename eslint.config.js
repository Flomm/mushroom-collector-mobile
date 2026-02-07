// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const testingLibraryPlugin = require('eslint-plugin-testing-library');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*']
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)', 'setup-jest.ts'],
    ...testingLibraryPlugin.configs['flat/react'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
]);
