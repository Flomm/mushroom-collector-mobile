import { ButtonComponent } from '@/components/Button/ButtonComponent';
import { CardComponent } from '@/components/Card/Card';
import { Divider } from '@/components/Divider/Divider';
import { InputControl } from '@/components/InputControl/InputControl';
import { ScreenWrapper } from '@/components/ScreenWrapper/ScreenWrapper';
import ValidatedController from '@/components/ValidatedController/ValidatedController';
import { useAuthContext } from '@/context/auth-context/auth.context';
import { useOrientation } from '@/context/orientation-context/orientation.context';
import { isNil } from '@/functions/is-nil';
import { SignInData } from '@/models/sign-in-data.type';
import { SignInFormSchema } from '@/validation/schemas/sign-in-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import SvgUri from 'expo-svg-uri';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { getTokens, Text, View } from 'tamagui';

export default function SignInScreen() {
  const { t } = useTranslation();
  const { signIn, authStateData } = useAuthContext();
  const isLandscape = useOrientation();

  const passwordRef = useRef<TextInput | null>(null);

  const { control, trigger, handleSubmit } = useForm<SignInData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (formData: SignInData) => {
    await signIn(formData);
  };

  return (
    <ScreenWrapper flexDirection={isLandscape ? 'row' : 'column'}>
      <View items='center'>
        <SvgUri width={120} height={120} source={require('@/assets/icons/app-auth.svg')} />
        <Text color='$primaryTextColor' fontWeight='700' fontFamily='$body' fontSize='$7'>
          {`  ${t('auth:sign-in:welcome')}  `}
        </Text>
      </View>
      <View flex={1} width='100%' justify='center' py='$2' paddingEnd={isLandscape ? '$5' : 0}>
        <CardComponent
          flex={1}
          gap='$2'
          flexDirection={isLandscape ? 'row' : 'column'}
          height={isLandscape ? '90%' : 'auto'}>
          <View flex={1}>
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
                      styles={{ marginTop: 0 }}
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
                      secure={true}
                    />
                  </ValidatedController>
                );
              }}
            />

            <ButtonComponent
              loading={authStateData.loading}
              onPress={handleSubmit(onSubmit)}
              testID='login_button'
              text='auth:sign-in:login'
              styles={{ marginTop: 6 }}
            />

            <Text color='$errorColor' fontWeight='700' fontFamily='$body'>
              {authStateData.authError && t(authStateData.authError)}
            </Text>
          </View>

          <View flex={1}>
            <View>
              {!isLandscape && <Divider />}

              <ButtonComponent
                disabled={authStateData.loading}
                onPress={() => console.warn('lol')}
                testID='x'
                text='auth:sign-in:sign-up'
                styles={{ marginTop: 0 }}
              />
            </View>
            <View>
              <ButtonComponent
                disabled={authStateData.loading}
                type='plain'
                onPress={() => console.warn('lol')}
                testID='x'
                iconUri='google'
                text='auth:sign-in:google'
                styles={{ marginBottom: getTokens().space.$4.val }}
              />
              <ButtonComponent
                disabled={authStateData.loading}
                onPress={() => console.warn('lol')}
                testID='x'
                text='auth:sign-in:facebook'
                iconUri='facebook'
              />
            </View>
          </View>
        </CardComponent>
      </View>
    </ScreenWrapper>
  );
}
