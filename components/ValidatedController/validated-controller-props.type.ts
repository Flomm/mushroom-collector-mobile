import type { PropsWithChildren } from 'react';
import type { FieldError } from 'react-hook-form';

export type ValidatedControllerProps = {
  error?: FieldError;
  validationExtras?: Record<string, unknown>;
  textPosition?: 'top' | 'bottom';
  testID?: string;
} & PropsWithChildren;
