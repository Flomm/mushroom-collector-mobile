import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { styled } from 'tamagui';

const DividerComponent = styled(View, {
  borderBottomColor: '$primaryTextColor',
  borderBottomWidth: StyleSheet.hairlineWidth,
  marginBlock: '$4',
  testID: 'divider'
});

export const Divider: FC = () => <DividerComponent />;
