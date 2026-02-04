import { SvgList } from '@/models/svg-uri';
import { GlobalStyles } from '@/styles/global-styles';
import { getTokens, useTheme, View } from '@tamagui/core';
import SvgUri from 'expo-svg-uri';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, TextInput } from 'react-native';
import { InputControlProps } from './input-control-props.type';

export const InputControl: FC<InputControlProps> = ({
  value,
  setValue,
  testID,
  placeholder,
  disabled,
  iconUri,
  iconFill,
  type,
  marginVertical = 4,
  hasError = false,
  onSubmitEditing,
  inputRef,
  secure
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [inputReadable, setInputReadable] = useState<boolean>(true);

  return (
    <View
      items='center'
      flexDirection='row'
      paddingStart='$2'
      paddingEnd='$2'
      style={[
        GlobalStyles.shadowWrapper,
        {
          marginVertical,
          borderRadius: getTokens().radius[5].val,
          height: getTokens().size['$5'].val,
          borderWidth: 1,
          borderColor: hasError ? theme.errorColor.val : theme.primaryTextColor.val,
          shadowColor: theme.shadowColor.val
        }
      ]}>
      {iconUri && (
        <SvgUri
          style={{
            marginEnd: getTokens().space[1].val
          }}
          width={30}
          height={30}
          stroke={
            !iconFill ? 'transparent' : type === 'secondary' ? theme.secondaryTextColor.val : theme.primaryTextColor.val
          }
          fill={
            iconFill ? 'transparent' : type === 'secondary' ? theme.secondaryTextColor.val : theme.primaryTextColor.val
          }
          source={SvgList[iconUri]}
        />
      )}
      <TextInput
        testID={testID}
        style={{
          color: theme.primaryTextColor.val,
          fontSize: getTokens().size.$1.val,
          flex: 1
        }}
        editable={!disabled}
        placeholder={t(placeholder ?? '')}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onSubmitEditing}
        ref={inputRef}
        secureTextEntry={!inputReadable}
      />
      {secure && (
        <Pressable onPress={() => setInputReadable(prev => !prev)}>
          <SvgUri
            style={{
              marginEnd: getTokens().space[1].val
            }}
            width={30}
            height={30}
            stroke={
              !iconFill
                ? 'transparent'
                : type === 'secondary'
                  ? theme.secondaryTextColor.val
                  : theme.primaryTextColor.val
            }
            fill={
              iconFill
                ? 'transparent'
                : type === 'secondary'
                  ? theme.secondaryTextColor.val
                  : theme.primaryTextColor.val
            }
            source={inputReadable ? SvgList['notVisible'] : SvgList['visible']}
          />
        </Pressable>
      )}
    </View>
  );
};
