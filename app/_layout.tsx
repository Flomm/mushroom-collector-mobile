import { AuthProvider } from '@/context/auth-context/auth.context';
import { OrientationProvider } from '@/context/orientation-context/orientation.context';
import { ThemeProvider } from '@/context/theme-context/theme.context';
import { SplashScreenController } from '@/functions/splash-controller';
import { NavigationWrapper } from '@/navigation/NavigationWrapper';
import { I18nextProvider } from 'react-i18next';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18nInstance from '../functions/i18n';

export const unstable_settings = {
  anchor: '(tabs)'
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18nInstance}>
        <OrientationProvider>
          <AuthProvider>
            <ThemeProvider>
              <SplashScreenController />
              <NavigationWrapper />
            </ThemeProvider>
          </AuthProvider>
        </OrientationProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
