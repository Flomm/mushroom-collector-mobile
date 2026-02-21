import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

const OrientationContext = createContext<boolean>(false);

export const OrientationProvider = ({ children }: PropsWithChildren) => {
  const { width, height } = useWindowDimensions();
  const isLandscape: boolean = useMemo(() => width >= height, [width, height]);

  return <OrientationContext.Provider value={isLandscape}>{children}</OrientationContext.Provider>;
};

export const useOrientation = () => {
  return useContext(OrientationContext);
};
