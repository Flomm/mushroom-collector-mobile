import { styled, View } from 'tamagui';

export const CardComponent = styled(View, {
  width: '100%',
  bg: '$secondaryBackground',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  paddingBlock: '$4',
  paddingEnd: '$4',
  paddingStart: '$4',
  borderTopLeftRadius: '$4',
  borderTopRightRadius: '$4',
  borderBottomLeftRadius: '$4',
  borderBottomRightRadius: '$4',
  elevationAndroid: 3
});
