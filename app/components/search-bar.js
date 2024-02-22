import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';

import theme from '../theme';

const SearchBar = ({ telMobile, email }) => {
  return (
    <View flexDirection="row" alignItems="center">
      <TextInput
        style={{
          width: '100%',
          backgroundColor: theme.colors.inputGrey,
          padding: 12,
          borderRadius: 20,
        }}
        placeholder="Rechercher"
      />
      <Image
        style={{ marginLeft: -40, width: 20, height: 20 }}
        source={require('../assets/recherche-gris.png')}
      />
    </View>
  );
};

export default SearchBar;
