import { CardComponent } from '@/components/Card/Card';
import { ScreenWrapper } from '@/components/ScreenWrapper/ScreenWrapper';
import { HeaderText } from '@/components/Text/HeaderText';
import { WelcomeMessage } from '@/components/WelcomeMessage/WelcomeMessage';
import { useOrientation } from '@/context/orientation-context/orientation.context';
import { useTranslation } from 'react-i18next';
import { View } from 'tamagui';

export default function SignUpScreen() {
  const { t } = useTranslation();
  const isLandscape = useOrientation();

  return (
    <ScreenWrapper flexDirection={isLandscape ? 'row' : 'column'}>
      <WelcomeMessage />
      <View flex={1} width='100%' justify='center' py='$2' paddingEnd={isLandscape ? '$5' : 0}>
        <CardComponent
          flex={1}
          gap='$2'
          flexDirection={isLandscape ? 'row' : 'column'}
          height={isLandscape ? '90%' : 'auto'}>
          <HeaderText text='center' color='$primaryTextColor' fontWeight='700' fontFamily='$body' fontSize='$7'>
            {t('auth:sign-up:sign-up-call')}
          </HeaderText>
        </CardComponent>
      </View>
    </ScreenWrapper>
  );
}
