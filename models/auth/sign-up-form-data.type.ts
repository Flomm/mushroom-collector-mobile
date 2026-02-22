import { SignInData } from './sign-in-data.type';

export type SignUpFormData = {
  passwordConfirm: string;
} & SignInData;
