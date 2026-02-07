import { mockTestId } from '@/__mocks__/mock-constants';
import { renderWithTamagui } from '@/__mocks__/tamagui-test-provider';
import { screen, userEvent } from '@testing-library/react-native';
import { ButtonComponent } from './ButtonComponent';

const mockOnPress = jest.fn();
const mockText = 'text';

describe('ButtonComponent', () => {
  it('should render correctly when only text is provided', () => {
    renderWithTamagui(<ButtonComponent testID={mockTestId} onPress={mockOnPress} text={mockText} />);

    const button = screen.getByTestId(mockTestId);
    expect(button).toBeVisible();

    const text = screen.getByTestId(`${mockTestId}-text`);
    expect(text).toBeVisible();
    expect(text).toHaveTextContent(mockText);

    const loader = screen.queryByTestId(`${mockTestId}-loader`);
    expect(loader).not.toBeOnTheScreen();

    const icon = screen.queryByTestId(`${mockTestId}-icon`);
    expect(icon).not.toBeOnTheScreen();
  });

  it('should render correctly when text and icon are provided', () => {
    renderWithTamagui(
      <ButtonComponent testID={mockTestId} type='plain' onPress={mockOnPress} text={mockText} iconUri='facebook' />
    );

    const text = screen.getByTestId(`${mockTestId}-text`);
    expect(text).toBeVisible();
    expect(text).toHaveTextContent(mockText);

    const icon = screen.getByTestId(`${mockTestId}-icon`);
    expect(icon).toBeVisible();

    const loader = screen.queryByTestId(`${mockTestId}-loader`);
    expect(loader).not.toBeOnTheScreen();
  });

  it('should render correctly when loading', () => {
    renderWithTamagui(
      <ButtonComponent testID={mockTestId} onPress={mockOnPress} text={mockText} iconUri='facebook' loading={true} />
    );

    const loader = screen.getByTestId(`${mockTestId}-loader`);
    expect(loader).toBeVisible();

    const icon = screen.queryByTestId(`${mockTestId}-icon`);
    expect(icon).not.toBeOnTheScreen();

    const text = screen.queryByTestId(`${mockTestId}-text`);
    expect(text).not.toBeOnTheScreen();
  });

  it('should call onPress from props when pressable is pressed', async () => {
    renderWithTamagui(<ButtonComponent testID={mockTestId} onPress={mockOnPress} text={mockText} iconUri='facebook' />);

    const button = screen.getByTestId(mockTestId);

    await userEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress from props when pressable is pressed but disabled', async () => {
    renderWithTamagui(
      <ButtonComponent testID={mockTestId} onPress={mockOnPress} disabled={true} text={mockText} iconUri='facebook' />
    );

    const button = screen.getByTestId(mockTestId);

    await userEvent.press(button);

    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
