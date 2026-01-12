import { useSession } from '@/context/auth-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function SignInScreen() {
  const { signIn } = useSession();
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{t('test')}</Text>
      <Text
        onPress={() => {
          console.warn('clicker');
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is successful before navigating.
          router.replace('/');
        }}>
        Sign In
      </Text>
    </View>
  );
}
