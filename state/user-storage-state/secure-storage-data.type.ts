import { AuthData } from '@/models/auth/auth-data.type';

export type SecureStoreState = {
  authData: AuthData | null;
  setAuthData: (authData: AuthData | null) => void;
};
