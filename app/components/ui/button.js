import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import theme from '../../theme';

const Input = ({ text, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={{
        width: '75%',
        backgroundColor: disabled ? theme.colors.navy : theme.colors.navy,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 20,
        opacity: disabled ? 0.5 : 1,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          color: theme.colors.white,
          fontWeight: 'bold',
          fontSize: theme.font.sizes.lg,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Input;
