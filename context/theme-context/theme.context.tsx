import { config } from '@/tamagui.config';
import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';

const ThemeContext = createContext<{
  darkTheme: boolean;
}>({
  darkTheme: false
});

export const useAppTheme = (): boolean => {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useAppTheme must be wrapped in a <ThemeProvider />');
  }

  return value.darkTheme;
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();

  return (
    <ThemeContext.Provider
      value={{
        darkTheme: colorScheme === 'dark'
      }}>
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>{children}</Theme>
      </TamaguiProvider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeContext.Provider>
  );
}
