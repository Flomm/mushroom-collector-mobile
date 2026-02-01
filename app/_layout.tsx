// import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { SessionProvider, useSession } from '@/context/auth-context';
import { ThemeProvider } from '@/context/theme-context';
import { SplashScreenController } from '@/functions/splash-controller';
import { View } from '@tamagui/core';
import { Stack } from 'expo-router';
import { I18nextProvider } from 'react-i18next';
import 'react-native-reanimated';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import i18nInstance from '../functions/i18n';

export const unstable_settings = {
  anchor: '(tabs)'
};

export default function RootLayout() {
  const { session } = useSession();
  const { bottom, top } = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18nInstance}>
        <SessionProvider>
          <ThemeProvider>
            <SplashScreenController />
            <View flex={1} bg='$mainBackground' style={{ paddingBottom: bottom, paddingTop: top }}>
              <Stack>
                <Stack.Protected guard={!!session}>
                  <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                  <Stack.Screen name='modal' options={{ presentation: 'modal', title: 'Modal' }} />
                </Stack.Protected>
                <Stack.Protected guard={!session}>
                  <Stack.Screen name='(auth)' options={{ headerShown: false }} />
                </Stack.Protected>
              </Stack>
            </View>
          </ThemeProvider>
        </SessionProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
