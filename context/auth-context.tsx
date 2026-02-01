import { SignInData } from '@/models/sign-in-data.type';
import { FirebaseAuthTypes, getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { createContext, use, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/use-storage-state';

const AuthContext = createContext<{
  signIn: (signInData: SignInData) => Promise<void | FirebaseAuthTypes.UserCredential>;
  signOut: () => void;
  signup: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(),
  signOut: () => null,
  signup: () => null,
  session: null,
  isLoading: false
});

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (signInData: SignInData) =>
          signInWithEmailAndPassword(getAuth(), signInData.email, signInData.password),
        signOut: () => setSession(null),
        signup: () => {},
        session,
        isLoading
      }}>
      {children}
    </AuthContext.Provider>
  );
}
