import React, { useMemo, useCallback } from 'react';
import {
  Dimensions,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import styled from 'styled-components';

import CardContact from '../components/cardContact.js';
import ContactInfo from '../components/contactInfo.js';
import CustomTab from '../components/customTab.js';
import InitialsCircle from '../components/initialsCircle.js';
import Card from '../components/ui/card.js';
import useFetch from '../hooks/useFetch.js';
import theme from '../theme.js';

const { width, height } = Dimensions.get('window');

const SContainer = styled.View`
  flex: 1;
  align-items: center;
  row-gap: ${theme.spaces.md}px;
  padding-horizontal: ${theme.spaces.lg}px;
`;

const ContactInstance = ({ navigation, route }) => {
  const type = route?.params?.type || 'user';
  const person = route?.params?.person;
  const contactId = route?.params?.contactId;
  const cardWidth = width - theme.spaces.md * 2;

  const { response, loading, error } = useFetch(
    `http://localhost:1337/api/${type}s/${contactId}?populate=*`,
  );

  const contact = response?.data?.attributes;
  const users = contact?.users?.data;
  const dossiersUsers = users?.map((el) => el?.attributes?.dossiers);
  const dossiersUsersFiltered = dossiersUsers?.filter((el) => el);
  const dossiersString = dossiersUsersFiltered?.join(', ');

  const content = useMemo(() => {
    let views = [];
    if (loading) {
      return <Text>Loading...</Text>;
    } else if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!response || !response.data || response.data.length === 0) {
      return <Text>No data</Text>;
    } else {
      const users = contact?.users?.data;
      if (users) {
        views = users.map((el, i) => {
          const user = el.attributes;
          const userId = el.id;
          return (
            <TouchableOpacity
              key={i}
              onPress={() =>
                navigation.navigate('Contact', {
                  type: 'user',
                  personId: userId,
                  person: user,
                })
              }
            >
              <View
                flexDirection="row"
                columnGap={theme.spaces.md}
                alignItems="center"
              >
                <InitialsCircle
                  text={user.prenom[0] + user.nom[0]}
                  width={50}
                  fontSize={theme.font.sizes.xl}
                />
                <Text
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    color: theme.colors.navy,
                  }}
                >
                  {user.prenom} {user.nom}
                </Text>
              </View>
            </TouchableOpacity>
          );
        });
      }

      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: width - theme.spaces.lg * 4,
            rowGap: theme.spaces.sm,
            paddingBottom: theme.spaces.lg,
          }}
        >
          {dossiersUsers && (
            <View width={cardWidth - theme.spaces.lg * 2 - theme.spaces.rg}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: theme.font.sizes.lg,
                }}
              >
                Dossiers
              </Text>
              <Text
                style={{
                  paddingLeft: theme.spaces.md,
                  paddingTop: theme.spaces.sm,
                }}
              >
                {dossiersString}
              </Text>
              <View alignItems="center">
                <View
                  borderBottomWidth={2}
                  paddingTop={theme.spaces.rg}
                  marginBottom={theme.spaces.rg}
                  borderBottomColor={theme.colors.inputGrey}
                  width="100%"
                />
              </View>
            </View>
          )}
          {views}
        </ScrollView>
      );
    }
  }, [
    loading,
    error,
    response,
    contact?.users?.data,
    dossiersUsers,
    cardWidth,
    dossiersString,
    navigation,
  ]);

  return (
    <SContainer>
      <View rowGap={theme.spaces.sm} alignItems="center">
        <Image
          source={require('../assets/departement-coul.png')}
          style={{ width: 70, height: 70 }}
        />
        <Text
          style={{ color: theme.colors.blue, fontSize: theme.font.sizes.lg }}
        >
          {contact?.name}
        </Text>
      </View>

      <View flexDirection="row" columnGap={theme.spaces.md}>
        {contact?.tel && (
          <CardContact
            text="APPEL"
            onPress={() => Linking.openURL(`tel:${contact?.tel}`)}
            image={require('../assets/tel-bleu.png')}
          />
        )}

        {contact?.email && (
          <CardContact
            width={20 * (500 / 369)}
            text="EMAIL"
            onPress={() => Linking.openURL(`mailto:${contact?.email}`)}
            image={require('../assets/mail-bleu.png')}
          />
        )}
      </View>
      <View alignItems="center">
        <Card
          minWidth={cardWidth}
          paddingTop={theme.spaces.lg}
          alignItems="flex-start"
          maxHeight={height / 2}
          minHeight={0}
        >
          <View width="100%" rowGap={theme.spaces.sm} padding={theme.spaces.lg}>
            <ContactInfo
              telMobile={person?.tel}
              email={person?.displayEmail || person?.email}
            />
            {content}
          </View>
        </Card>
      </View>
      <CustomTab />
    </SContainer>
  );
};

export default ContactInstance;
