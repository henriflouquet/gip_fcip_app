import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components';

import CardAccueil from '../components/cardAccueil.js';
import InitialsCircle from '../components/initialsCircle.js';
import SearchBar from '../components/searchBar.js';
import { useAuth } from '../hooks/useAuth.js';
import theme from '../theme.js';

const SContainer = styled.View`
  flex: 1;
  padding-horizontal: ${theme.spaces.lg}px;
`;

const SCardContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: ${theme.spaces.lg}px;
  column-gap: ${theme.spaces.lg}px;
  justify-content: center;
  align-items: center;
`;

const Accueil = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  console.log('user accueil', user);
  return (
    <SContainer>
      <View flex={1} rowGap={50}>
        <View alignItems="center">
          <InitialsCircle text="O B" />
          <Text>Bonjour</Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: theme.font.sizes.lg,
              color: theme.colors.navy,
            }}
          >
            Océane BARLET
          </Text>
        </View>
        <SearchBar />
        <SCardContainer>
          <CardAccueil
            // eslint-disable-next-line quotes
            text={`Questions \n fréquentes`}
            image={require('../assets/question-coul.png')}
            onPress={() => navigation.navigate('FAQ')}
          />
          <CardAccueil
            text="Annuaire"
            image={require('../assets/annuaire-coul.png')}
            width={70 * (500 / 607)}
            onPress={() => navigation.navigate('Annuaire')}
          />
          <CardAccueil
            text="Contacts"
            image={require('../assets/contact-coul.png')}
            onPress={() => navigation.navigate('Contacts')}
          />
          <CardAccueil
            text="Profil"
            image={require('../assets/profil-coul.png')}
            onPress={() => navigation.navigate('Profil')}
          />
        </SCardContainer>
        <View
          flexDirection="row"
          columnGap={theme.spaces.md}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            source={require('../assets/logo-GIPFCIP-lille-250.png')}
            style={{ height: 30, width: 30 * (250 / 101) }}
          />
          <Text style={{ fontSize: theme.font.sizes.md }}>
            Une application du GIP FCIP {'\n'} Lille Hauts de France
          </Text>
        </View>
      </View>
    </SContainer>
  );
};

export default Accueil;
