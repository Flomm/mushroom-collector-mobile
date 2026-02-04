import { styled } from '@tamagui/core';
import { KeyboardAvoidingView } from 'react-native';

export const ScreenWrapper = styled(KeyboardAvoidingView, {
  bg: '$mainBackground',
  flex: 1,
  items: 'center',
  paddingEnd: '$3',
  paddingStart: '$3'
});
