import { render, screen } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import * as ReactNative from 'react-native';
import { Text } from 'react-native';
import { OrientationProvider, useOrientation } from './orientation.context';

jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  default: jest.fn()
}));

const renderWithContext = (children: ReactElement) => render(<OrientationProvider>{children}</OrientationProvider>);

const OrientationTestComponent = (): ReactElement => {
  const orientation = useOrientation();
  return <Text testID='layout-test'>{String(orientation)}</Text>;
};

describe('OrientationContext', () => {
  let useWindowDimensionsSpy: jest.SpyInstance;

  beforeEach(() => {
    useWindowDimensionsSpy = jest.spyOn(ReactNative, 'useWindowDimensions');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should provide landscape value to children when screen height is smaller than width', () => {
    useWindowDimensionsSpy.mockReturnValue({ width: 20, height: 10 });
    renderWithContext(<OrientationTestComponent />);
    const testText = screen.getByTestId('layout-test');
    expect(testText).toHaveTextContent('true');
  });

  it('should provide portrait value to children when screen height is bigger than width', () => {
    useWindowDimensionsSpy.mockReturnValue({ width: 10, height: 20 });

    renderWithContext(<OrientationTestComponent />);
    const testText = screen.getByTestId('layout-test');
    expect(testText).toHaveTextContent('false');
  });

  it('should provide correct value to children when screen height is equal to width', () => {
    useWindowDimensionsSpy.mockReturnValue({ width: 20, height: 20 });

    renderWithContext(<OrientationTestComponent />);
    const testText = screen.getByTestId('layout-test');
    expect(testText).toHaveTextContent('true');
  });
});
