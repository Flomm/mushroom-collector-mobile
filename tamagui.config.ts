import { defaultConfig } from '@tamagui/config/v5';
import { createTamagui } from '@tamagui/core';
import { allThemes } from './theme/themes';
import { MCTamaguiTokens, playFont } from './theme/tokens';

export const config = createTamagui({
  ...defaultConfig,
  media: {
    ...defaultConfig.media
  },
  tokens: {
    // ...defaultConfig.tokens,
    space: {
      ...MCTamaguiTokens.space
    },
    size: {
      ...defaultConfig.tokens.size
    },
    radius: {
      ...defaultConfig.tokens.radius,
      ...MCTamaguiTokens.radius
    },
    color: {
      ...MCTamaguiTokens.color
    },
    zIndex: {
      ...defaultConfig.tokens.zIndex,
      ...MCTamaguiTokens.zIndex
    }
  },
  fonts: {
    body: playFont,
    heading: playFont
  },
  themes: {
    light: allThemes.light,
    dark: allThemes.dark
  }
});

type OurConfig = typeof config;

declare module '@tamagui/core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends OurConfig {}
}
