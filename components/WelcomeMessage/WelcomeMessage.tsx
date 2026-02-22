import SvgUri from 'expo-svg-uri';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'tamagui';
import { HeaderText } from '../Text/HeaderText';

export const WelcomeMessage: FC = () => {
  const { t } = useTranslation();

  return (
    <View items='center'>
      <SvgUri testID='welcome-icon' width={120} height={120} source={require('@/assets/icons/app-auth.svg')} />
      <HeaderText testID='welcome-message' color='$primaryTextColor' fontWeight='700' fontFamily='$body' fontSize='$7'>
        {`  ${t('auth:sign-in:welcome')}  `}
      </HeaderText>
    </View>
  );
};
