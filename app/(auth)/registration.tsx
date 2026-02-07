import { useTranslation } from 'react-i18next';
import { Text, View } from 'tamagui';

export default function RegistrationScreen() {
  const { t } = useTranslation();

  return (
    <View bg='$mainBackgroundLight' flex={1} justify={'center'} items={'center'}>
      <Text fontSize='$1'>{t('test')}</Text>
      <Text>Registerr</Text>
    </View>
  );
}
