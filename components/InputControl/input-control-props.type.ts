import { ComponentThemeOptions } from '@/models/component-theme-options.type';
import { SvgName } from '@/models/svg-uri';
import { RefObject } from 'react';
import { TextInput, TextInputSubmitEditingEvent } from 'react-native';

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
  onSubmitEditing?: (e: TextInputSubmitEditingEvent) => void;
  inputRef?: RefObject<TextInput | null>;
  secure?: boolean;
};
