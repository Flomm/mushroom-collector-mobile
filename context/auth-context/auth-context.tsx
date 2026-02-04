import handledFireBaseErrors from '@/constants/firebase-handled-errors';
import { isNil } from '@/functions/is-nil';
import { SignInData } from '@/models/sign-in-data.type';
import { useSecureStorage } from '@/state/user-storage-state/use-storage-state';
import {
  FirebaseAuthTypes,
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { createContext, use, useCallback, useEffect, useState, type PropsWithChildren } from 'react';
import { AuthContextData } from './auth-context-data.type';

const AuthContext = createContext<{
  signIn: (signInData: SignInData) => Promise<void | FirebaseAuthTypes.UserCredential>;
  signOut: () => void;
  signup: () => void;
  authStateData: AuthContextData;
}>({
  signIn: () => Promise.resolve(),
  signOut: () => null,
  signup: () => null,
  authStateData: {
    loading: true,
    loggedIn: false,
    authError: null
  }
});

// Use this hook to access the user info.
export function useAuthContext() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const { setAuthData } = useSecureStorage();
  const [authStateData, setAuthStateData] = useState<AuthContextData>({
    loading: true,
    loggedIn: false,
    authError: null
  });

  const createAuthStateData = (
    loading: boolean,
    loggedIn: boolean,
    authError: string | null = null
  ): AuthContextData => ({
    loading,
    loggedIn,
    authError
  });

  const handleAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      if (isNil(user)) {
        setAuthData(null);
        setAuthStateData(createAuthStateData(false, false));
        return;
      }
      setAuthData({
        email: user.email,
        idToken: 'test'
      });
      setAuthStateData(createAuthStateData(false, true));
    },
    [setAuthData]
  );

  const signIn = async (signInData: SignInData): Promise<void> => {
    try {
      setAuthStateData(createAuthStateData(true, false));
      const userResponse = await signInWithEmailAndPassword(getAuth(), signInData.email, signInData.password);
      if (isNil(userResponse)) {
        setAuthData(null);
        setAuthStateData(createAuthStateData(false, false));
        return;
      }
      setAuthData({
        email: userResponse.user.email,
        idToken: 'test'
      });
      setAuthStateData(createAuthStateData(false, true));
      router.replace('/');
      console.warn('LOGGEDIN');
    } catch (e: any) {
      const actualErrorCode = handledFireBaseErrors.includes(e.code) ? e.code : 'unknown';
      setAuthStateData(createAuthStateData(false, false, `firebase_errors:${actualErrorCode}`));
    }
  };

  const signOut = async (): Promise<void> => {
    setAuthStateData(createAuthStateData(true, true));
    try {
      await firebaseSignOut(getAuth());
      setAuthData(null);
      setAuthStateData(createAuthStateData(false, false));
    } catch (e: any) {
      console.error('Logout failed: ', e);
      setAuthData(null);
      setAuthStateData(createAuthStateData(false, false));
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, [handleAuthStateChanged]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signup: () => {},
        authStateData
      }}>
      {children}
    </AuthContext.Provider>
  );
}
