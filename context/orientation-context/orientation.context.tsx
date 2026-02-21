import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { ScreenOrientationType } from './screen-orientation.type';

const OrientationContext = createContext<ScreenOrientationType>('portrait');

export const OrientationProvider = ({ children }: PropsWithChildren) => {
  const { width, height } = useWindowDimensions();
  const mode: ScreenOrientationType = useMemo(() => (width >= height ? 'landscape' : 'portrait'), [width, height]);

  return <OrientationContext.Provider value={mode}>{children}</OrientationContext.Provider>;
};

export const useOrientation = () => {
  return useContext(OrientationContext);
};
