import { styled } from '@tamagui/core';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

const DividerComponent = styled(View, {
  borderBottomColor: '$primaryTextColor',
  borderBottomWidth: StyleSheet.hairlineWidth,
  marginBlock: '$4'
});

export const Divider: FC = () => <DividerComponent />;
