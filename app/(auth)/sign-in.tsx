import { Text, View } from '@tamagui/core';
import SvgUri from 'expo-svg-uri';
import { useTranslation } from 'react-i18next';

export default function SignInScreen() {
  const { t } = useTranslation();

  return (
    <View bg='$mainBackground' flex={1} justify={'center'} items={'center'}>
      <SvgUri
        style={{ marginBottom: 'auto' }}
        width={150}
        height={150}
        source={require('@/assets/icons/app-auth.svg')}
      />
      <View flex={1}>
        <Text fontWeight='700' fontFamily='$body' fontSize='$7'>
          {t('auth:sign-in:welcome')}
        </Text>
        <Text>Sign In</Text>
      </View>
    </View>
  );
}
