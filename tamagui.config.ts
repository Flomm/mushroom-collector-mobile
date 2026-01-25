import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui, createTokens } from 'tamagui';

const MCTamaguiTokens = createTokens({
  color: {
    mainBackgroundLight: 'white',
    mainBackgroundDark: 'black'
  }
  // ... see configuration docs for required tokens
});

export const config = createTamagui({
  ...defaultConfig,
  media: {
    ...defaultConfig.media
    // add your own media queries here, if wanted
  },
  tokens: {
    ...defaultConfig.tokens,
    ...MCTamaguiTokens
  },
  themes: {
    dark: {
      mainBackground: MCTamaguiTokens.color.mainBackgroundLight
    },
    light: {
      mainBackground: MCTamaguiTokens.color.mainBackgroundDark
    }
  }
});

type OurConfig = typeof config;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends OurConfig {}
}
