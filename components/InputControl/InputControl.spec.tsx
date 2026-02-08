import { mockTestId } from '@/__mocks__/mock-constants';
import { renderWithTamagui } from '@/__mocks__/tamagui-test-provider';
import { fireEvent, screen, userEvent } from '@testing-library/react-native';
import { InputControl } from './InputControl';

const mockValue = 'test';
const mockSetValue = jest.fn();
const mockSubmitEditing = jest.fn();

describe('InputControl', () => {
  it('should render correctly when not secure and no icon', () => {
    renderWithTamagui(<InputControl value={mockValue} setValue={mockSetValue} testID={mockTestId} />);

    const input = screen.getByTestId(mockTestId);
    expect(input).toBeVisible();
    expect(input).toHaveDisplayValue(mockValue);
    expect(input.props.secureTextEntry).toBeFalse();

    const icon = screen.queryByTestId(`${mockTestId}-icon`);
    expect(icon).not.toBeOnTheScreen();

    const securePressable = screen.queryByTestId(`${mockTestId}-secure-pressable`);
    expect(securePressable).not.toBeOnTheScreen();
  });

  it('should render correctly when secure and has icon', () => {
    renderWithTamagui(
      <InputControl value={mockValue} setValue={mockSetValue} testID={mockTestId} iconUri='facebook' secure={true} />
    );

    const input = screen.getByTestId(mockTestId);
    expect(input.props.secureTextEntry).toBeTrue();

    const icon = screen.getByTestId(`${mockTestId}-icon`);
    expect(icon).toBeVisible();

    const securePressable = screen.getByTestId(`${mockTestId}-secure-pressable`);
    expect(securePressable).toBeVisible();
  });

  it('should toggle the secure prop of input when secure-pressable is pressed', async () => {
    renderWithTamagui(
      <InputControl
        hasError={true}
        type='secondary'
        value={mockValue}
        setValue={mockSetValue}
        testID={mockTestId}
        iconUri='facebook'
        secure={true}
      />
    );

    const input = screen.getByTestId(mockTestId);
    expect(input.props.secureTextEntry).toBeTrue();

    const securePressable = screen.getByTestId(`${mockTestId}-secure-pressable`);

    await userEvent.press(securePressable);

    expect(input.props.secureTextEntry).toBeFalse();
  });

  it('should call onChange when user types into input', async () => {
    const testValue = 'test';
    renderWithTamagui(
      <InputControl
        type='secondary'
        iconFill={true}
        value={''}
        setValue={mockSetValue}
        testID={mockTestId}
        iconUri='facebook'
        keyboardType='email-address'
      />
    );

    const input = screen.getByTestId(mockTestId);

    await userEvent.type(input, testValue);
    expect(mockSetValue).toHaveBeenCalledTimes(testValue.length);
    expect(mockSetValue).toHaveBeenLastCalledWith(testValue[testValue.length - 1]);
  });

  it('should call onSubmitEditing from props when user submits edit', async () => {
    renderWithTamagui(
      <InputControl
        iconFill={true}
        value={''}
        setValue={mockSetValue}
        testID={mockTestId}
        iconUri='facebook'
        onSubmitEditing={mockSubmitEditing}
      />
    );

    const input = screen.getByTestId(mockTestId);

    fireEvent(input, 'submitEditing');
    expect(mockSubmitEditing).toHaveBeenCalledOnce();
  });
});
