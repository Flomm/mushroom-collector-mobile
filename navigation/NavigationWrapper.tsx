import { useAuthContext } from '@/context/auth-context/auth-context';
import { View } from '@tamagui/core';
import { Stack } from 'expo-router';
import { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const NavigationWrapper: FC = () => {
  const { bottom, top } = useSafeAreaInsets();
  const { authStateData } = useAuthContext();

  return (
    <View flex={1} bg='$mainBackground' style={{ paddingBottom: bottom, paddingTop: top }}>
      <Stack>
        <Stack.Protected guard={authStateData.loggedIn}>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='modal' options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack.Protected>
        <Stack.Protected guard={!authStateData.loggedIn}>
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </View>
  );
};
