import { ScreenWrapper } from '@/components/ScreenWrapper/ScreenWrapper';
import { useAuthContext } from '@/context/auth-context/auth.context';
import { Pressable } from 'react-native';
import { Text } from 'tamagui';

export default function HomeScreen() {
  const { signOut } = useAuthContext();

  return (
    <ScreenWrapper>
      <Pressable onPress={signOut}>
        <Text>Logout</Text>
      </Pressable>
    </ScreenWrapper>
  );
}
