import { AuthData } from '@/models/auth-data.type';

export type SecureStoreState = {
  authData: AuthData | null;
  setAuthData: (authData: AuthData | null) => void;
};
