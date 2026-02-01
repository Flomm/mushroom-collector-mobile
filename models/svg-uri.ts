import email from '@/assets/icons/email.svg';
import facebook from '@/assets/icons/facebook.svg';
import google from '@/assets/icons/google.svg';
import password from '@/assets/icons/password.svg';

export const SvgList = {
  facebook,
  google,
  email,
  password
} as const;

export type SvgName = keyof typeof SvgList;
