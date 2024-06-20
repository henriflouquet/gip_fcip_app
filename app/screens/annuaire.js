import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';

import CustomTab from '../components/customTab.js';
import InitialsCircle from '../components/initialsCircle.js';
import SearchBar from '../components/searchBar.js';
import Card from '../components/ui/card.js';
import useFetch from '../hooks/useFetch.js';
import theme from '../theme.js';

const { width, height } = Dimensions.get('window');

const SContainer = styled.View`
  flex: 1;
`;

const SContentContainer = styled.View`
  padding-horizontal: ${theme.spaces.lg}px;
  row-gap: ${theme.spaces.lg}px;
`;

const Annuaire = () => {
  const heightImg = 70;
  const cardWidth = width - theme.spaces.md * 2;
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  const { response, loading, error } = useFetch(
    'http://localhost:1337/api/departements?&populate=users',
  );

  const filterContacts = useCallback(
    (val) => {
      if (response && response.data.length > 0) {
        const filtered = response.data.filter(
          (el) =>
            el.attributes.users.data.some(
              (user) =>
                user.attributes.nom.toLowerCase().includes(val.toLowerCase()) ||
                user.attributes.prenom
                  .toLowerCase()
                  .includes(val.toLowerCase()) ||
                user.attributes.fonction
                  .toLowerCase()
                  .includes(val.toLowerCase()) ||
                user.attributes.pole
                  ?.toLowerCase()
                  .includes(val.toLowerCase()) ||
                user.attributes.dossiers
                  .toLowerCase()
                  .includes(val.toLowerCase()),
            ) ||
            el.attributes.name.toLowerCase().includes(val.toLowerCase()) ||
            el.attributes?.dossiers?.toLowerCase().includes(val.toLowerCase()),
        );
        console.log('filtered', filtered);
        if (val === '' || filtered?.length === 0) {
          setSearchResults([]);
        } else {
          setSearchResults(filtered);
        }
      }
    },
    [response],
  );

  const content = useMemo(() => {
    let views = [];
    if (loading) {
      return <Text>Loading...</Text>;
    } else if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!response || !response.data || response.data.length === 0) {
      return <Text>No data</Text>;
    } else {
      const data = searchResults.length > 0 ? searchResults : response.data;
      views = data.map((el, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigation.navigate('ContactInstance', {
                type: 'departement',
                contactId: el.id,
              })
            }
          >
            <View
              flexDirection="row"
              columnGap={theme.spaces.md}
              alignItems="center"
            >
              <InitialsCircle
                text={el.attributes.name.split(':')[0]}
                width={55}
                fontSize={theme.font.sizes.rg}
              />
              <Text
                style={{
                  flex: 1,
                  fontWeight: 'bold',
                  color: theme.colors.navy,
                }}
              >
                {el.attributes.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView
          contentContainerStyle={{
            width: cardWidth - theme.spaces.lg * 2,
            rowGap: theme.spaces.sm,
            paddingBottom: theme.spaces.lg,
          }}
        >
          {views}
        </ScrollView>
      );
    }
  }, [loading, error, response, searchResults, cardWidth, navigation]);

  return (
    <SContainer>
      <SContentContainer>
        <View rowGap={theme.spaces.sm} alignItems="center">
          <Image
            source={require('../assets/annuaire-coul.png')}
            style={{ width: heightImg * (500 / 607), height: heightImg }}
          />
          <Text
            style={{ color: theme.colors.blue, fontSize: theme.font.sizes.lg }}
          >
            Annuaire
          </Text>
        </View>
        <SearchBar onChangeText={filterContacts} />
        <View alignItems="center">
          <Card
            minWidth={cardWidth}
            paddingTop={theme.spaces.lg}
            alignItems="flex-start"
            maxHeight={height / 1.8}
          >
            <View
              marginLeft={theme.spaces.lg}
              rowGap={theme.spaces.sm}
              paddingTop={theme.spaces.lg}
            >
              {content}
            </View>
          </Card>
        </View>
      </SContentContainer>
      <CustomTab />
    </SContainer>
  );
};

export default Annuaire;
