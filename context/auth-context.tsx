import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { createContext, use, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/use-storage-state';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  signup: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
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
        signIn: () => {
          // Perform sign-in logic here
          setSession('xxx');
          signInWithEmailAndPassword(getAuth(), 'test@test.hu', 'test123').catch(e => {
            console.warn(e);
          });
        },
        signOut: () => {
          setSession(null);
        },
        signup: () => {},
        session,
        isLoading
      }}>
      {children}
    </AuthContext.Provider>
  );
}
