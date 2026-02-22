import { isNil } from '@/functions/is-nil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'tamagui';
import { ErrorText } from '../Text/ErrorText';
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
        <ErrorText testID={`${testID}_${error.message}`} fontSize={'$2'} height={validationHeight}>
          {t(`validation_errors:${error.message}`, validationExtras)}
        </ErrorText>
      )}
      {textPosition === 'top' && children}
    </View>
  );
};

export default ValidatedController;
