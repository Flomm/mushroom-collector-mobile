import { ButtonComponent } from '@/components/Button/ButtonComponent';
import { CardComponent } from '@/components/Card/Card';
import { InputControl } from '@/components/InputControl/InputControl';
import { ScreenWrapper } from '@/components/ScreenWrapper/ScreenWrapper';
import { ErrorText } from '@/components/Text/ErrorText';
import { HeaderText } from '@/components/Text/HeaderText';
import ValidatedController from '@/components/ValidatedController/ValidatedController';
import { WelcomeMessage } from '@/components/WelcomeMessage/WelcomeMessage';
import { ValidationConstants } from '@/constants/validation-constants';
import { useAuthContext } from '@/context/auth-context/auth.context';
import { useOrientation } from '@/context/orientation-context/orientation.context';
import { isNil } from '@/functions/is-nil';
import { SignUpFormData } from '@/models/auth/sign-up-form-data.type';
import { SignUpFormSchema } from '@/validation/schemas/sign-up-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { View } from 'tamagui';

export default function SignUpScreen() {
  const { t } = useTranslation();
  const isLandscape = useOrientation();
  const { signUp, signUpStateData } = useAuthContext();

  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  const { control, trigger, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (formData: SignUpFormData) => {
    const { passwordConfirm, ...rest } = formData;
    await signUp(rest);
  };

  return (
    <ScreenWrapper flexDirection={isLandscape ? 'row' : 'column'}>
      <WelcomeMessage />
      <View flex={1} width='100%' justify='center' py='$2' paddingEnd={isLandscape ? '$5' : 0}>
        <CardComponent
          flex={1}
          gap='$2'
          flexDirection={isLandscape ? 'row' : 'column'}
          height={isLandscape ? '90%' : 'auto'}>
          <View flex={1}>
            <HeaderText text='center'>{t('auth:sign-up:sign_up_call')}</HeaderText>

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
                  <ValidatedController
                    error={error}
                    validationExtras={{ minLength: ValidationConstants.passwordMinLength }}>
                    <InputControl
                      iconUri='password'
                      placeholder='auth:sign-in:password'
                      value={value}
                      setValue={onChange}
                      testID='password-control'
                      hasError={!isNil(error)}
                      inputRef={passwordRef}
                      onSubmitEditing={() => {
                        passwordConfirmRef.current?.focus();
                        trigger('password');
                      }}
                      secure={true}
                    />
                  </ValidatedController>
                );
              }}
            />

            <Controller
              name='passwordConfirm'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <ValidatedController error={error}>
                    <InputControl
                      iconUri='password'
                      placeholder='auth:sign-up:password_confirm'
                      value={value}
                      setValue={onChange}
                      testID='passwordConfirm-control'
                      hasError={!isNil(error)}
                      inputRef={passwordConfirmRef}
                      onSubmitEditing={handleSubmit(onSubmit)}
                      secure={true}
                    />
                  </ValidatedController>
                );
              }}
            />
          </View>
          <View flex={1}>
            <ButtonComponent
              disabled={signUpStateData.loading}
              loading={signUpStateData.loading}
              onPress={handleSubmit(onSubmit)}
              testID='signup-button'
              text='auth:sign-in:sign-up'
              styles={{ marginTop: 36 }}
            />

            {signUpStateData.success && (
              <HeaderText text='center' color='$successColor' fontSize='$5'>
                {t('auth:sign_up:success')}
              </HeaderText>
            )}

            <ErrorText>{signUpStateData.signUpError && t(signUpStateData.signUpError)}</ErrorText>
          </View>
        </CardComponent>
      </View>
    </ScreenWrapper>
  );
}
