import handledFireBaseErrors from '@/constants/firebase-handled-errors';
import { handledGoogleSignInErrors } from '@/constants/google-signin-handled-errors';
import { isNil } from '@/functions/is-nil';
import { SignInData } from '@/models/auth/sign-in-data.type';
import { useSecureStorage } from '@/state/user-storage-state/use-storage-state';
import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  signOut as firebaseSignOut,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithCredential,
  signInWithEmailAndPassword
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { createContext, use, useCallback, useEffect, useState, type PropsWithChildren } from 'react';
import { AuthContextProviderData } from './auth-context-provider-data.type';
import { AuthStateData } from './auth-state-data.type';
import { SignUpStateData } from './sign-up-state-data.type';

const AuthContext = createContext<AuthContextProviderData>({
  signIn: () => Promise.resolve(),
  googleSignIn: () => Promise.resolve(),
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

  const handleAuthFailure = useCallback(
    (persistNotVerifiedError?: boolean) => {
      setAuthData(null);
      setAuthStateData(prev =>
        createAuthStateData(
          false,
          false,
          prev.authError === 'firebase_errors:email_not_verified' && persistNotVerifiedError ? prev.authError : null
        )
      );
    },
    [setAuthData, setAuthStateData]
  );

  const handleAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      if (isNil(user)) {
        handleAuthFailure(true);
        return;
      }

      if (!user.emailVerified) {
        setAuthStateData(createAuthStateData(false, false, 'firebase_errors:email_not_verified'));
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

      if (!userResponse.user.emailVerified) {
        setAuthStateData(createAuthStateData(false, false, 'firebase_errors:email_not_verified'));
        await firebaseSignOut(getAuth());
        return;
      }
      router.replace('/');
    } catch (e: any) {
      const actualErrorCode = handledFireBaseErrors.includes(e.code) ? e.code : 'unknown';
      setAuthStateData(createAuthStateData(false, false, `firebase_errors:${actualErrorCode}`));
    }
  };

  const googleSignIn = async () => {
    try {
      setAuthStateData(createAuthStateData(true, false));
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResponse = await GoogleSignin.signIn();
      if (signInResponse.type === 'success') {
        const idToken = signInResponse.data?.idToken;
        const googleCredential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(getAuth(), googleCredential);
        return;
      }
      setAuthStateData(createAuthStateData(false, false));
    } catch (e: any) {
      const actualErrorCode = handledGoogleSignInErrors.includes(e.code) ? e.code : 'unknown';
      setAuthStateData(createAuthStateData(false, false, `google_sign_in_errors:${actualErrorCode}`));
    }
  };

  const signUp = async (signUpData: SignInData): Promise<void> => {
    try {
      setSignUpStateData({
        loading: true,
        success: false,
        signUpError: null
      });
      const userData = await createUserWithEmailAndPassword(getAuth(), signUpData.email, signUpData.password);
      await sendEmailVerification(userData.user);
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
    GoogleSignin.configure({ webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID });

    return subscriber;
  }, [handleAuthStateChanged]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        googleSignIn,
        signOut,
        signUp,
        authStateData,
        signUpStateData
      }}>
      {children}
    </AuthContext.Provider>
  );
}
