import { render } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { TamaguiProvider, createTamagui } from 'tamagui';
import { config } from '../tamagui.config';

const tamaguiConfig = createTamagui(config);

export function TestProviders({ children }: { children: React.ReactNode }) {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
}

export const renderWithTamagui = (children: ReactElement) => {
  render(children, {
    wrapper: TestProviders
  });
};
