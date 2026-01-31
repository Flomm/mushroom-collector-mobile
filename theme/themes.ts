import { MCTamaguiTokens } from './tokens';

const light = {
  mainBackground: MCTamaguiTokens.color.mainBackgroundLight,
  secondaryBackground: MCTamaguiTokens.color.secondaryBackgroundLight,
  primaryTextColor: MCTamaguiTokens.color.primaryTextColorLight,
  secondaryTextColor: MCTamaguiTokens.color.secondaryTextColorLight
};

type BaseTheme = typeof light;

const dark: BaseTheme = {
  mainBackground: MCTamaguiTokens.color.mainBackgroundLight,
  secondaryBackground: MCTamaguiTokens.color.secondaryBackgroundLight,
  primaryTextColor: MCTamaguiTokens.color.primaryTextColorLight,
  secondaryTextColor: MCTamaguiTokens.color.secondaryTextColorLight
};

export const allThemes = {
  dark,
  light
} satisfies { [key: string]: BaseTheme };
