import { mockTestId } from '@/__mocks__/mock-constants';
import { renderWithTamagui } from '@/__mocks__/tamagui-test-provider';
import { TestChildComponent } from '@/__mocks__/TestChildComponent';
import { screen } from '@testing-library/react-native';
import React from 'react';
import ValidatedController from './ValidatedController';

describe('ValidatedController', () => {
  it('Should render ValidatedController with correct child and no ErrorScreen if "error" prop is falsy', () => {
    renderWithTamagui(
      <ValidatedController>
        <TestChildComponent />
      </ValidatedController>
    );

    const child = screen.getByTestId(mockTestId);
    expect(child).toBeVisible();
  });

  it('Should render ValidatedController with correct child and ErrorScreen if "error" prop is provided', () => {
    renderWithTamagui(
      <ValidatedController
        error={{
          message: 'required',
          type: ''
        }}>
        <TestChildComponent />
      </ValidatedController>
    );

    const child = screen.getByTestId(mockTestId);
    const error = screen.getByTestId('error_required');

    expect(child).toBeVisible();
    expect(error).toBeVisible();
    expect(error).toHaveTextContent('validation_errors:required');
  });
});
