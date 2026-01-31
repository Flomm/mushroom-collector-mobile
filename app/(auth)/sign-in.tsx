import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Divider } from '@/components/Divider/Divider';
import { ScreenWrapper } from '@/components/ScreenWrapper/ScreenWrapper';
import { tokens } from '@tamagui/config/v5';
import { Text, View } from '@tamagui/core';
import SvgUri from 'expo-svg-uri';
import { useTranslation } from 'react-i18next';

export default function SignInScreen() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <SvgUri width={150} height={150} source={require('@/assets/icons/app-auth.svg')} />
      <Text color='$primaryTextColor' marginBlockEnd='$2' fontWeight='700' fontFamily='$body' fontSize='$7'>
        {t('auth:sign-in:welcome')}
      </Text>
      <View flex={1} width='100%' justify='center'>
        <Card>
          <Button onPress={() => console.warn(tokens.space)} testID='x' text='auth:sign-in:login' />
          <Divider />
          <Button onPress={() => console.warn('lol')} testID='x' text='auth:sign-in:sign-up' />
          <Button
            type='plain'
            onPress={() => console.warn('lol')}
            testID='x'
            iconUri='google'
            text='auth:sign-in:google'
          />
          <Button onPress={() => console.warn('lol')} testID='x' text='auth:sign-in:facebook' iconUri='facebook' />
        </Card>
      </View>
    </ScreenWrapper>
  );
}
