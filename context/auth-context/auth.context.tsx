import handledFireBaseErrors from '@/constants/firebase-handled-errors';
import { isNil } from '@/functions/is-nil';
import { SignInData } from '@/models/sign-in-data.type';
import { useSecureStorage } from '@/state/user-storage-state/use-storage-state';
import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { createContext, use, useCallback, useEffect, useState, type PropsWithChildren } from 'react';
import { AuthContextProviderData } from './auth-context-provider-data.type';
import { AuthStateData } from './auth-state-data.type';
import { SignUpStateData } from './sign-up-state-data.type';

const AuthContext = createContext<AuthContextProviderData>({
  signIn: () => Promise.resolve(),
  signOut: () => null,
  signUp: () => Promise.resolve(),
  authStateData: {
    loading: true,
    loggedIn: false,
    authError: null
  },
  signUpStateData: {
    loading: false,
    success: false,
    signUpError: null
  }
});

export function useAuthContext() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useAuthContext must be wrapped in a <AuthProvider />');
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const { setAuthData } = useSecureStorage();
  const [authStateData, setAuthStateData] = useState<AuthStateData>({
    loading: true,
    loggedIn: false,
    authError: null
  });
  const [signUpStateData, setSignUpStateData] = useState<SignUpStateData>({
    loading: false,
    success: false,
    signUpError: null
  });

  const createAuthStateData = (
    loading: boolean,
    loggedIn: boolean,
    authError: string | null = null
  ): AuthStateData => ({
    loading,
    loggedIn,
    authError
  });

  const handleAuthFailure = useCallback(() => {
    setAuthData(null);
    setAuthStateData(createAuthStateData(false, false));
  }, [setAuthData, setAuthStateData]);

  const handleAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      if (isNil(user)) {
        handleAuthFailure();
        return;
      }
      setAuthData({
        email: user.email,
        idToken: 'test'
      });
      setAuthStateData(createAuthStateData(false, true));
    },
    [setAuthData, handleAuthFailure]
  );

  const signIn = async (signInData: SignInData): Promise<void> => {
    try {
      setAuthStateData(createAuthStateData(true, false));
      const userResponse = await signInWithEmailAndPassword(getAuth(), signInData.email, signInData.password);
      if (isNil(userResponse)) {
        handleAuthFailure();
        return;
      }
      setAuthData({
        email: userResponse.user.email,
        idToken: 'test'
      });
      setAuthStateData(createAuthStateData(false, true));
      router.replace('/');
    } catch (e: any) {
      const actualErrorCode = handledFireBaseErrors.includes(e.code) ? e.code : 'unknown';
      setAuthStateData(createAuthStateData(false, false, `firebase_errors:${actualErrorCode}`));
    }
  };

  const signUp = async (signUpData: SignInData): Promise<void> => {
    try {
      setSignUpStateData({
        loading: true,
        success: false,
        signUpError: null
      });
      await createUserWithEmailAndPassword(getAuth(), signUpData.email, signUpData.password);
      setSignUpStateData({
        loading: false,
        success: true,
        signUpError: null
      });
    } catch (e: any) {
      const actualErrorCode = handledFireBaseErrors.includes(e.code) ? e.code : 'unknown';
      setSignUpStateData({
        loading: false,
        success: false,
        signUpError: `firebase_errors:${actualErrorCode}`
      });
    }
  };

  const signOut = async (): Promise<void> => {
    setAuthStateData(createAuthStateData(true, true));
    try {
      await firebaseSignOut(getAuth());
      handleAuthFailure();
    } catch (e: any) {
      console.error('Logout failed: ', e);
      handleAuthFailure();
    } finally {
      router.replace('/(auth)/sign-in');
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
        signUp,
        authStateData,
        signUpStateData
      }}>
      {children}
    </AuthContext.Provider>
  );
}
