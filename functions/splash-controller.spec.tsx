import { useAuthContext } from '@/context/auth-context/auth.context';
import { useFonts } from '@expo-google-fonts/play/useFonts';
import { render } from '@testing-library/react-native';
import { SplashScreen } from 'expo-router';
import { SplashScreenController } from './splash-controller';

jest.mock('@/context/auth-context/auth.context', () => ({
  useAuthContext: jest.fn()
}));

jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  SplashScreen: {
    preventAutoHideAsync: jest.fn(),
    hide: jest.fn()
  }
}));

jest.mock('@expo-google-fonts/play/useFonts', () => ({
  ...jest.requireActual('@expo-google-fonts/play/useFonts'),
  useFonts: jest.fn()
}));

const useAuthContextMock = useAuthContext as jest.Mock;
const useFontsMock = useFonts as jest.Mock;

describe('SplashScreenController', () => {
  it('should not hide SplashScreen if fonts are loaded but authStateData.loading is true', () => {
    useAuthContextMock.mockReturnValue({ authStateData: { loading: true } });
    useFontsMock.mockReturnValue([true]);

    render(<SplashScreenController />);

    expect(SplashScreen.hide).not.toHaveBeenCalled();
  });

  it('should not hide SplashScreen if authStateData.loading is false, but fonts are not loaded', () => {
    useAuthContextMock.mockReturnValue({ authStateData: { loading: false } });
    useFontsMock.mockReturnValue([false]);
    render(<SplashScreenController />);

    expect(SplashScreen.hide).not.toHaveBeenCalled();
  });

  it('should hide SplashScreen if authStateData.loading is false, and fonts are loaded', () => {
    useAuthContextMock.mockReturnValue({ authStateData: { loading: false } });
    useFontsMock.mockReturnValue([true]);
    render(<SplashScreenController />);

    expect(SplashScreen.hide).toHaveBeenCalledOnce();
  });
});
