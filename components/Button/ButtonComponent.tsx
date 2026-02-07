import { SvgList } from '@/models/svg-uri';
import { GlobalStyles } from '@/styles/global-styles';
import { LinearGradient } from 'expo-linear-gradient';
import SvgUri from 'expo-svg-uri';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ColorValue, Pressable } from 'react-native';
import { getTokens, styled, Text, useTheme, View } from 'tamagui';
import { ButtonComponentProps } from './button-component-props.type';

const StyledGradient = styled(LinearGradient, {
  width: '100%',
  height: '100%',
  items: 'center',
  justify: 'center',
  flexDirection: 'row',
  py: '$4',
  px: '$4',
  borderTopLeftRadius: '$6',
  borderTopRightRadius: '$6',
  borderBottomLeftRadius: '$6',
  borderBottomRightRadius: '$6'
});

export const ButtonComponent: FC<ButtonComponentProps> = ({
  onPress,
  text,
  testID,
  type = 'gradient',
  marginVertical = 8,
  loading = false,
  disabled = false,
  iconUri,
  accessibilityLabel
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getGradientColors = useMemo(() => {
    if (type === 'gradient') {
      return [theme.gradientTopColor.val, theme.gradientMidColor.val, theme.gradientBottomColor.val] as [
        ColorValue,
        ColorValue,
        ...ColorValue[]
      ];
    }
    const bgColor = theme.secondaryBackground.val;

    return [bgColor, bgColor] as [ColorValue, ColorValue, ...ColorValue[]];
  }, [type, theme]);

  return (
    <Pressable
      style={{
        marginVertical,
        height: getTokens().size['$6'].val,
        borderRadius: getTokens().radius[6].val,
        borderWidth: type === 'gradient' ? 0 : 1,
        borderColor: theme.primaryTextColor.val,
        shadowColor: theme.shadowColor.val
      }}
      disabled={disabled || loading}
      onPress={onPress}
      testID={testID}
      accessibilityState={{ disabled: disabled || loading }}
      accessibilityLabel={t(accessibilityLabel ?? text)}>
      {({ pressed }) => (
        <View
          style={[
            GlobalStyles.shadowWrapper,
            {
              borderRadius: getTokens().radius[6].val
            }
          ]}>
          <StyledGradient
            style={{
              opacity: pressed ? 0.8 : disabled || loading ? 0.5 : 1
            }}
            colors={getGradientColors}>
            <View flexDirection='row' items='center' width='75%' justify={iconUri ? 'flex-start' : 'center'}>
              {iconUri && !loading && (
                <SvgUri
                  testID={`${testID}-icon`}
                  style={{
                    marginEnd: getTokens().space[3].val
                  }}
                  width={40}
                  height={40}
                  fill={type === 'gradient' ? theme.secondaryTextColor.val : theme.primaryTextColor.val}
                  source={SvgList[iconUri]}
                />
              )}
              {loading ? (
                <ActivityIndicator
                  testID={`${testID}-loader`}
                  size='large'
                  color={type === 'gradient' ? theme.secondaryTextColor.val : theme.primaryTextColor.val}
                />
              ) : (
                <Text
                  testID={`${testID}-text`}
                  color={type === 'gradient' ? '$secondaryTextColor' : '$primaryTextColor'}
                  fontFamily='$body'
                  fontWeight='700'
                  fontSize='$5'>
                  {`  ${t(text)}  `}
                </Text>
              )}
            </View>
          </StyledGradient>
        </View>
      )}
    </Pressable>
  );
};
