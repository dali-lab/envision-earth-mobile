import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Colors, TextStyles } from '../../styles';

interface AppButtonProps {
  onChangeText: (text: string) => void
  value: string
  placeholder: string
  secureTextEntry?: boolean
  width?: number
  height?: number
  multiline?: boolean
}

const AppTextInput = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  width,
  height,
  multiline,
}: AppButtonProps) => (
  <TextInput
    onChangeText={onChangeText}
    value={value}
    placeholder={placeholder}
    placeholderTextColor={Colors.primary.lightGreen}
    style={[
      styles.appTextInputContainer,
      { width, height },
    ]}
    secureTextEntry={(secureTextEntry === null || secureTextEntry === undefined) ? false : secureTextEntry}
    multiline={multiline}
  />
);

const styles = StyleSheet.create({
  appTextInputContainer: {
    ...TextStyles.body,
    borderColor: 'lightgrey',
    borderRadius: 12,
    borderWidth: 1,
    width: '75%',
    padding: 10,
    textAlign: 'center',
    backgroundColor: Colors.secondary.white,
    textColor: Colors.primary.deepGreen,
  },
});

// TODO: How to make inset shadow?

export default AppTextInput;
