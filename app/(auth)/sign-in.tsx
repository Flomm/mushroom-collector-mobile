import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Divider } from '@/components/Divider/Divider';
import { InputControl } from '@/components/InputControl/InputControl';
import { ScreenWrapper } from '@/components/ScreenWrapper/ScreenWrapper';
import ValidatedController from '@/components/ValidatedController/ValidatedController';
import handledFireBaseErrors from '@/constants/firebase-handled-errors';
import { useSession } from '@/context/auth-context';
import { isNil } from '@/functions/is-nil';
import { ApiCallState } from '@/models/api-call-state.type';
import { SignInData } from '@/models/sign-in-data.type';
import { SignInFormSchema } from '@/validation/schemas/sign-in-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text, View } from '@tamagui/core';
import SvgUri from 'expo-svg-uri';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';

export default function SignInScreen() {
  const { t } = useTranslation();
  const { signIn } = useSession();

  const passwordRef = useRef<TextInput | null>(null);

  const { control, trigger, handleSubmit } = useForm<SignInData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const [signInState, setSigInState] = useState<ApiCallState>({
    state: 'success'
  });

  const onSubmit = (formData: SignInData) => {
    console.warn(formData);
    setSigInState({ state: 'loading' });
    signIn(formData)
      .catch(e => {
        const actualErrorCode = handledFireBaseErrors.includes(e.code) ? e.code : 'unknown';
        setSigInState({ state: 'error', error: `firebase_errors:${actualErrorCode}` });
      })
      .then(v => {
        if (v) {
          setSigInState({ state: 'success' });
        }
      });
  };

  return (
    <ScreenWrapper>
      <SvgUri width={150} height={150} source={require('@/assets/icons/app-auth.svg')} />
      <Text color='$primaryTextColor' fontWeight='700' fontFamily='$body' fontSize='$7'>
        {`  ${t('auth:sign-in:welcome')}  `}
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
                    testID='email-control'
                    onSubmitEditing={() => {
                      passwordRef.current?.focus();
                      trigger('email');
                    }}
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
                    testID='password-control'
                    hasError={!isNil(error)}
                    inputRef={passwordRef}
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                </ValidatedController>
              );
            }}
          />
          <Button
            loading={signInState.state === 'loading'}
            onPress={handleSubmit(onSubmit)}
            testID='login_button'
            text='auth:sign-in:login'
          />

          {signInState.state === 'error' && (
            <Text color='$errorColor' fontWeight='700' fontFamily='$body'>
              {t(signInState.error)}
            </Text>
          )}

          <Divider />

          <Button
            disabled={signInState.state === 'loading'}
            onPress={() => console.warn('lol')}
            testID='x'
            text='auth:sign-in:sign-up'
          />
          <Button
            disabled={signInState.state === 'loading'}
            type='plain'
            onPress={() => console.warn('lol')}
            testID='x'
            iconUri='google'
            text='auth:sign-in:google'
          />
          <Button
            disabled={signInState.state === 'loading'}
            onPress={() => console.warn('lol')}
            testID='x'
            text='auth:sign-in:facebook'
            iconUri='facebook'
          />
        </Card>
      </View>
    </ScreenWrapper>
  );
}
