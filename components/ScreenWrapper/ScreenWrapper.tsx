import { KeyboardAvoidingView } from 'react-native';
import { styled } from 'tamagui';

export const ScreenWrapper = styled(KeyboardAvoidingView, {
  bg: '$mainBackground',
  flex: 1,
  items: 'center',
  paddingEnd: '$3',
  paddingStart: '$3'
});
