// import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { SessionProvider, useSession } from '@/context/auth-context';
import { SplashScreenController } from '@/functions/splash-controller';
import { TamaguiProvider, Theme, View } from '@tamagui/core';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import i18nInstance from '../functions/i18n';
import { config } from '../tamagui.config'; // your configuration

export const unstable_settings = {
  anchor: '(tabs)'
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const [user, setUser] = useState();
  const { session } = useSession();
  const { bottom, top } = useSafeAreaInsets();

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
          <TamaguiProvider config={config} defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
            <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
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
                <StatusBar style='auto' />
              </View>
            </Theme>
          </TamaguiProvider>
        </SessionProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
