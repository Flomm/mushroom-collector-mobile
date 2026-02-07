import { mockTestId } from '@/__mocks__/mock-constants';
import { renderWithTamagui } from '@/__mocks__/tamagui-test-provider';
import { TestChildComponent } from '@/__mocks__/TestChildComponent';
import { screen } from '@testing-library/react-native';
import { Card } from './Card';

describe('Card', () => {
  it('should render correctly', () => {
    renderWithTamagui(
      <Card>
        <TestChildComponent />
      </Card>
    );

    const child = screen.getByTestId(mockTestId);
    expect(child).toBeVisible();
  });
});
