import { SvgName } from '@/models/svg-uri';
import { StyleProp, ViewStyle } from 'react-native';

export type ButtonComponentProps = {
  text: string;
  testID: string;
  onPress: () => void;
  iconUri?: SvgName;
  type?: 'gradient' | 'plain';
  marginVertical?: number;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  styles?: StyleProp<ViewStyle>;
};
