// import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { SessionProvider, useSession } from '@/context/auth-context';
import { SplashScreenController } from '@/functions/splash-controller';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { useEffect } from 'react';
import i18nInstance from '../functions/i18n';

export const unstable_settings = {
  anchor: '(tabs)'
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const [user, setUser] = useState();
  const { session } = useSession();

  // function handleAuthStateChanged(user) {
  //   console.warn(user);
  //   setUser(user);
  // }

  // useEffect(() => {
  //   console.warn(getAuth());
  //   const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18nInstance}>
        <SessionProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SplashScreenController />
            <Stack>
              <Stack.Protected guard={!!session}>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='modal' options={{ presentation: 'modal', title: 'Modal' }} />
              </Stack.Protected>

              <Stack.Protected guard={!session}>
                <Stack.Screen name='sign-in' options={{ headerShown: false }} />
              </Stack.Protected>
            </Stack>
            <StatusBar style='auto' />
          </ThemeProvider>
        </SessionProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
