import { SvgName } from '@/models/svg-uri';

export type ButtonProps = {
  text: string;
  testID: string;
  onPress: () => void;
  iconUri?: SvgName;
  type?: 'gradient' | 'plain';
  marginVertical?: number;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
};
