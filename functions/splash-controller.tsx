import { useAuthContext } from '@/context/auth-context/auth.context';
import { Play_400Regular } from '@expo-google-fonts/play/400Regular';
import { Play_700Bold } from '@expo-google-fonts/play/700Bold';
import { useFonts } from '@expo-google-fonts/play/useFonts';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { authStateData } = useAuthContext();
  const [fontsLoaded] = useFonts({
    Play_400Regular,
    Play_700Bold
  });

  if (authStateData.loggedIn && fontsLoaded) {
    SplashScreen.hide();
  }

  return null;
}
