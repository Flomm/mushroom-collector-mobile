import facebook from '@/assets/icons/facebook.svg';
import google from '@/assets/icons/google.svg';

export const SvgList = {
  facebook,
  google
} as const;

export type SvgName = keyof typeof SvgList;
