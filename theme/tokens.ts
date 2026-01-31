import { createFont, createTokens } from '@tamagui/core';

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

  // because android handles fonts differently, you need to map the weight
  // to the actual name of the font in the font-file
  // you can get the name with `otfinfo`: otfinfo --family Inter.ttf
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
    primaryTextColorDark: '#FAF7EA',
    secondaryTextColorLight: '#FAF7EA',
    secondaryTextColorDark: '#808080',
    secondaryBackgroundDark: '#D3D3D3'
  },
  // margin="$sm"
  space: {
    sm: 4,
    md: 8,
    lg: 12
  },
  // radius="$none"
  radius: { none: 0, sm: 3 }
});
