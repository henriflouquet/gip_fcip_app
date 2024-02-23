import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import theme from '../theme';

const { height } = Dimensions.get('window');

const SView = styled(View)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${theme.colors.blue};
  align-items: center;
  justify-content: center;
  ${Platform.OS === 'android'
    ? // eslint-disable-next-line quotes, indent
      "shadowcolor: '#E8E8E8'; elevation: 20;"
    : 'box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);'}
`;

const CustomTab = ({ text, image, width = 20, onPress }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      backgroundColor="white"
      minHeight={height * 0.12}
      width="100%"
      position="absolute"
      bottom={0}
      flexDirection="row"
      justifyContent="space-around"
      paddingBottom={insets.bottom}
      paddingTop={theme.spaces.md}
    >
      <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => navigation.navigate('Accueil')}
      >
        <Image
          source={require('../assets/accueil-gris.png')}
          style={{ width: 30, height: 30 }}
        />
        <Text>Accueil</Text>
      </TouchableOpacity>

      <View
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top={-20}
        left={0}
        right={0}
      >
        <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
          <SView>
            <Image
              source={require('../assets/question-blanc.png')}
              style={{ width: 35, height: 35 }}
            />
          </SView>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => navigation.navigate('Annuaire')}
      >
        <Image
          source={require('../assets/annuaire-gris.png')}
          style={{ width: 30 * (500 / 607), height: 30 }}
        />
        <Text style={{ color: '#9A9EB1', fontWeight: 'bold' }}>Annuaire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTab;
