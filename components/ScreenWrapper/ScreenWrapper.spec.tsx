import { renderWithTamagui } from '@/__mocks__/tamagui-test-provider';
import { screen } from '@testing-library/react-native';
import { ScreenWrapper } from './ScreenWrapper';

describe('ScreenWrapper', () => {
  it('should render correctly', () => {
    renderWithTamagui(<ScreenWrapper />);

    const divider = screen.getByTestId('screen-wrapper');
    expect(divider).toBeVisible();
  });
});
