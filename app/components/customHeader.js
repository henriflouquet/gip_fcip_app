import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '../theme';

const CustomHeader = ({ navigation, route }) => {
  console.log(route);
  const insets = useSafeAreaInsets();
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal={theme.spaces.lg}
      paddingTop={insets.top}
    >
      {route.name === 'Accueil' ? (
        <View width={20 * (500 / 460)} />
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/retour-gris.png')}
            style={{ width: 20 * (500 / 460), height: 20 }}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
        <Image
          source={require('../assets/profil-gris.png')}
          style={{ width: 30 * (500 / 621), height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
