import { useSession } from '@/context/auth-context';
import { Inter_400Regular, Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading: authLoading } = useSession();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_900Black
  });

  if (!authLoading && fontsLoaded) {
    SplashScreen.hide();
  }

  return null;
}
