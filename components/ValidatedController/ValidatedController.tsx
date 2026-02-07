import { isNil } from '@/functions/is-nil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'tamagui';
import type { ValidatedControllerProps } from './validated-controller-props.type.ts';

const validationHeight = 20;

const ValidatedController: React.FC<ValidatedControllerProps> = ({
  children,
  error,
  validationExtras,
  textPosition = 'bottom',
  testID = 'error'
}) => {
  const { t } = useTranslation();

  return (
    <View
      width='100%'
      pb={error ? 0 : textPosition === 'bottom' ? validationHeight : 0}
      pt={error ? 0 : textPosition !== 'bottom' ? validationHeight : 0}>
      {textPosition === 'bottom' && children}
      {!isNil(error) && (
        <Text
          testID={`${testID}_${error.message}`}
          color='$errorColor'
          fontFamily='$body'
          fontSize={'$2'}
          height={validationHeight}>
          {t(`validation_errors:${error.message}`, validationExtras)}
        </Text>
      )}
      {textPosition === 'top' && children}
    </View>
  );
};

export default ValidatedController;
