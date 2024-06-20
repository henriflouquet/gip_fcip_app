import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, Image, Text, View, TouchableOpacity } from 'react-native';
import { AlphabetList } from 'react-native-section-alphabet-list';
import styled from 'styled-components';

import CustomTab from '../components/customTab.js';
import SearchBar from '../components/searchBar.js';
import useFetch from '../hooks/useFetch.js';
import theme from '../theme.js';

const { height } = Dimensions.get('window');

const SContainer = styled.View`
  flex: 1;
`;

const SContentContainer = styled.View`
  padding-horizontal: ${theme.spaces.lg}px;
  margin-bottom: ${height * 0.12}px;
  padding-bottom: ${theme.spaces.lg}px;
`;

const Contacts = () => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState([]);
  const { response, loading, error } = useFetch(
    `${baseUrl}users?populate=instances`,
  );

  const filterContacts = useCallback(
    (val) => {
      if (response && response.length > 0) {
        const filtered = response.filter(
          (el) =>
            el.prenom.toLowerCase().includes(val.toLowerCase()) ||
            el.nom.toLowerCase().includes(val.toLowerCase()) ||
            el?.dossiers?.toLowerCase().includes(val.toLowerCase()) ||
            el?.fonction?.toLowerCase().includes(val.toLowerCase()) ||
            el?.pole?.toLowerCase().includes(val.toLowerCase()) ||
            el?.instances?.some((instance) =>
              instance?.name.toLowerCase().includes(val.toLowerCase()),
            ),
        );
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
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    if (!response || response.length === 0) {
      return <Text>No data</Text>;
    } else {
      const data = searchResults.length > 0 ? searchResults : response;
      const users = data.map((el) => {
        return {
          value: el.nom + ' ' + el.prenom,
          key: el.id,
          ...el,
        };
      });

      return (
        <AlphabetList
          data={users}
          showsVerticalScrollIndicator={false}
          renderCustomSectionHeader={(section) => (
            <View style={{ padding: theme.spaces.sm }}>
              <Text style={{ fontSize: theme.font.sizes.lg }}>
                {section.title}
              </Text>
            </View>
          )}
          renderCustomItem={(item) => (
            <TouchableOpacity
              style={{
                paddingVertical: theme.spaces.rg,
              }}
              onPress={() =>
                navigation.navigate('Contact', {
                  person: item,
                  personId: item.key,
                })
              }
            >
              <Text>
                {item?.nom} {item?.prenom}
              </Text>
            </TouchableOpacity>
          )}
        />
      );
    }
  }, [loading, error, response, searchResults, navigation]);

  return (
    <SContainer>
      <SContentContainer style={{ rowGap: theme.spaces.lg }}>
        <View rowGap={theme.spaces.sm} alignItems="center">
          <Image
            source={require('../assets/contact-coul.png')}
            style={{ width: 70, height: 70 }}
          />
          <Text
            style={{ color: theme.colors.blue, fontSize: theme.font.sizes.lg }}
          >
            Contacts
          </Text>
        </View>
        <SearchBar type="contacts" onChangeText={filterContacts} />
        <View
          paddingHorizontal={theme.spaces.md}
          height={height - height * 0.12 - 270}
        >
          {content}
        </View>
      </SContentContainer>
      <CustomTab />
    </SContainer>
  );
};

export default Contacts;
