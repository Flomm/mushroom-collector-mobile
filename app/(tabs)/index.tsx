import { ScreenWrapper } from '@/components/ScreenWrapper/ScreenWrapper';
import { useAuthContext } from '@/context/auth-context/auth-context';
import { Text } from '@tamagui/core';
import { Pressable } from 'react-native';

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
