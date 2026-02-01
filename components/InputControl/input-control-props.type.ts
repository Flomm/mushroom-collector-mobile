import { ComponentThemeOptions } from '@/models/component-theme-options.type';
import { SvgName } from '@/models/svg-uri';

export type InputControlProps = {
  value: string;
  setValue: (newValue: string) => void;
  testID: string;
  label?: string;
  placeholder?: string;
  iconUri?: SvgName;
  iconFill?: boolean;
  disabled?: boolean;
  type?: ComponentThemeOptions;
  marginVertical?: number;
  hasError?: boolean;
};
