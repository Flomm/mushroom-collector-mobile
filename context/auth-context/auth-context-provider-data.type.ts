import { SignInData } from '@/models/sign-in-data.type';
import { AuthStateData } from './auth-state-data.type';
import { SignUpStateData } from './sign-up-state-data.type';

export type AuthContextProviderData = {
  signIn: (signInData: SignInData) => Promise<void>;
  signOut: () => void;
  signUp: (signUpData: SignInData) => Promise<void>;
  authStateData: AuthStateData;
  signUpStateData: SignUpStateData;
};
