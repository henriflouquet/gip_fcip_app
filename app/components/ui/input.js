import React from 'react';
import { TextInput } from 'react-native';

import theme from '../../theme';

const Input = ({ placeholder, isPassword = false, onChangeText }) => {
  return (
    <TextInput
      style={{
        width: '100%',
        backgroundColor: theme.colors.inputGrey,
        padding: 12,
        borderRadius: 20,
      }}
      autoCapitalize="none"
      placeholder={placeholder}
      secureTextEntry={isPassword}
      onChangeText={onChangeText}
    />
  );
};

export default Input;
