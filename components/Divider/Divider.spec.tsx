import { renderWithTamagui } from '@/__mocks__/tamagui-test-provider';
import { screen } from '@testing-library/react-native';
import { Divider } from './Divider';

describe('Divider', () => {
  it('should render correctly', () => {
    renderWithTamagui(<Divider />);

    const divider = screen.getByTestId('divider');
    expect(divider).toBeVisible();
  });
});
