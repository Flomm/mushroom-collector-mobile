import { Dimensions, PixelRatio } from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
const widthBaseScale = width / 393;
const heightBaseScale = height / 852;

const normalize = (size: number, based = 'width'): number => {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const widthPixel = (size: number) => {
  return normalize(size, 'width');
};

const heightPixel = (size: number) => {
  return normalize(size, 'height');
};

const fontPixel = (size: number) => {
  return heightPixel(size);
};

const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
};

const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};
export { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel };
