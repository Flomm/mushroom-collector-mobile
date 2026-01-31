import { MCTamaguiTokens } from './tokens';

const light = {
  mainBackground: MCTamaguiTokens.color.mainBackgroundLight,
  secondaryBackground: MCTamaguiTokens.color.secondaryBackgroundLight,
  primaryTextColor: MCTamaguiTokens.color.primaryTextColorLight,
  secondaryTextColor: MCTamaguiTokens.color.secondaryTextColorLight,
  shadowColor: MCTamaguiTokens.color.shadowColorLight,
  gradientTopColor: MCTamaguiTokens.color.gradientTopColorLight,
  gradientMidColor: MCTamaguiTokens.color.gradientMidColorLight,
  gradientBottomColor: MCTamaguiTokens.color.gradientBottomColorLight
};

type BaseTheme = typeof light;

const dark: BaseTheme = {
  mainBackground: MCTamaguiTokens.color.mainBackgroundDark,
  secondaryBackground: MCTamaguiTokens.color.secondaryBackgroundDark,
  primaryTextColor: MCTamaguiTokens.color.primaryTextColorDark,
  secondaryTextColor: MCTamaguiTokens.color.secondaryTextColorDark,
  shadowColor: MCTamaguiTokens.color.shadowColorDark,
  gradientTopColor: MCTamaguiTokens.color.gradientTopColorDark,
  gradientMidColor: MCTamaguiTokens.color.gradientMidColorDark,
  gradientBottomColor: MCTamaguiTokens.color.gradientBottomColorDark
};

export const allThemes = {
  dark,
  light
} satisfies { [key: string]: BaseTheme };
