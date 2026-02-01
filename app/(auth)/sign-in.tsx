import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Divider } from '@/components/Divider/Divider';
import { InputControl } from '@/components/InputControl/InputControl';
import { ScreenWrapper } from '@/components/ScreenWrapper/ScreenWrapper';
import ValidatedController from '@/components/ValidatedController/ValidatedController';
import { isNil } from '@/functions/is-nil';
import { SignInData } from '@/models/sign-in-data.type';
import { SignInFormSchema } from '@/validation/schemas/sign-in-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { tokens } from '@tamagui/config/v5';
import { Text, View } from '@tamagui/core';
import SvgUri from 'expo-svg-uri';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function SignInScreen() {
  const { t } = useTranslation();
  const { control } = useForm<SignInData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  return (
    <ScreenWrapper>
      <SvgUri width={150} height={150} source={require('@/assets/icons/app-auth.svg')} />
      <Text color='$primaryTextColor' marginBlockEnd='$2' fontWeight='700' fontFamily='$body' fontSize='$7'>
        {t('auth:sign-in:welcome')}
      </Text>
      <View flex={1} width='100%' justify='center'>
        <Card>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <ValidatedController error={error}>
                  <InputControl
                    iconUri='email'
                    iconFill={true}
                    placeholder='auth:sign-in:email'
                    value={value}
                    setValue={onChange}
                    testID='x'
                    hasError={!isNil(error)}
                  />
                </ValidatedController>
              );
            }}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <ValidatedController error={error}>
                  <InputControl
                    iconUri='password'
                    placeholder='auth:sign-in:password'
                    value={value}
                    setValue={onChange}
                    testID='x'
                    hasError={!isNil(error)}
                  />
                </ValidatedController>
              );
            }}
          />
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
