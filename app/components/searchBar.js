import React, { useCallback } from 'react';
import { Image, TextInput, View } from 'react-native';

import Input from './ui/input';
import { useAuth } from '../hooks/useAuth';
import theme from '../theme';

const SearchBar = ({ onChangeText }) => {
  return (
    <View flexDirection="row" alignItems="center">
      <Input placeholder="Rechercher" onChangeText={onChangeText} />
      <Image
        style={{ marginLeft: -40, width: 20, height: 20 }}
        source={require('../assets/recherche-gris.png')}
      />
    </View>
  );
};

export default SearchBar;
