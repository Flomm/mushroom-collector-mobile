import { createFont, createTokens } from 'tamagui';

export const playFont = createFont({
  family: 'Play_400Regular',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 22,
    4: 24,
    5: 28,
    6: 32,
    7: 36
  },
  weight: {
    4: '400',
    7: '700'
  },
  letterSpacing: {
    4: 0,
    8: -1
  },
  face: {
    400: { normal: 'Play_400Regular' },
    700: { normal: 'Play_700Bold' }
  }
});

export const MCTamaguiTokens = createTokens({
  color: {
    mainBackgroundLight: '#E8E3d4',
    mainBackgroundDark: '#000000',
    secondaryBackgroundLight: '#F4EEE3',
    primaryTextColorLight: '#77583E',
    primaryTextColorDark: '#FFFFFF',
    secondaryTextColorLight: '#FAF7EA',
    secondaryTextColorDark: '#FAF7EA',
    secondaryBackgroundDark: '#D3D3D3',
    shadowColorLight: '#000000',
    shadowColorDark: '#FFFFFF',
    gradientTopColorLight: '#9DAA63',
    gradientMidColorLight: '#8FA055',
    gradientBottomColorLight: '#6B854D',
    gradientTopColorDark: '#3c6297',
    gradientMidColorDark: '#153b66',
    gradientBottomColorDark: '#33127b',
    errorColor: '#FF4047'
  },
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    true: 12
  },
  radius: { none: 0, sm: 3 },
  size: {
    buttonSize: 40
  }
});
