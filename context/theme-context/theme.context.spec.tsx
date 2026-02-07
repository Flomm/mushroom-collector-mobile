import { render, screen } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import * as ReactNative from 'react-native';
import { Text } from 'react-native';
import { ThemeProvider, useAppTheme } from './theme.context';

const renderWithContext = (children: ReactElement) => render(<ThemeProvider>{children}</ThemeProvider>);

const ThemedTestComponent = (): ReactElement => {
  const isDark = useAppTheme();
  return <Text testID='theme-test'>{String(isDark)}</Text>;
};

describe('ThemeContext', () => {
  let useColorSchemeSpy: jest.SpyInstance;

  beforeEach(() => {
    useColorSchemeSpy = jest.spyOn(ReactNative, 'useColorScheme');
  });

  afterEach(() => {
    useColorSchemeSpy.mockReset(); // ✅ safe
  });

  it('should provide correct value to children with light', () => {
    useColorSchemeSpy.mockReturnValue('light');
    renderWithContext(<ThemedTestComponent />);
    const testText = screen.getByTestId('theme-test');
    expect(testText).toHaveTextContent('false');
  });

  it('should provide correct value to children with dark', () => {
    useColorSchemeSpy.mockReturnValue('dark');

    renderWithContext(<ThemedTestComponent />);
    const testText = screen.getByTestId('theme-test');
    expect(testText).toHaveTextContent('true');
  });
});
