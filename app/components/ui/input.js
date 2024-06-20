import Feather from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput } from 'react-native';

import theme from '../../theme';

const Input = ({ placeholder, isPassword = false, onChangeText }) => {
  const [isSecure, setIsSecure] = useState(isPassword);
  return (
    <View flexDirection="row" alignItems="center">
      <TextInput
        style={{
          width: '100%',
          backgroundColor: theme.colors.inputGrey,
          padding: 12,
          borderRadius: 20,
        }}
        autoCapitalize="none"
        placeholder={placeholder}
        secureTextEntry={isSecure}
        onChangeText={onChangeText}
      />
      {isPassword && (
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={() => setIsSecure(!isSecure)}
        >
          <Feather
            name={isSecure ? 'eye-off' : 'eye'}
            size={24}
            color={isSecure ? theme.colors.grey5 : theme.colors.grey4}
            style={{ position: 'absolute', right: 20 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
