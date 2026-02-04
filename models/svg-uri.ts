import email from '@/assets/icons/email.svg';
import facebook from '@/assets/icons/facebook.svg';
import google from '@/assets/icons/google.svg';
import notVisible from '@/assets/icons/not_visible.svg';
import password from '@/assets/icons/password.svg';
import visible from '@/assets/icons/visible.svg';

export const SvgList = {
  facebook,
  google,
  email,
  password,
  visible,
  notVisible
} as const;

export type SvgName = keyof typeof SvgList;
