import { renderWithTamagui } from '@/__mocks__/tamagui-test-provider';
import { screen } from '@testing-library/react-native';
import { WelcomeMessage } from './WelcomeMessage';

describe('WelcomeMessage', () => {
  it('should render correctly', () => {
    renderWithTamagui(<WelcomeMessage />);

    const icon = screen.getByTestId('welcome-icon');
    expect(icon).toBeVisible();

    const text = screen.getByTestId('welcome-message');
    expect(text).toBeVisible();
    expect(text).toHaveTextContent('auth:sign-in:welcome');
  });
});
