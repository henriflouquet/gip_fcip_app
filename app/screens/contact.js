import React, { useMemo, useCallback } from 'react';
import { Dimensions, Image, Text, Linking, View } from 'react-native';
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

const Contact = ({ navigation, route }) => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  const type = route?.params?.type || 'user';
  const personId = route?.params?.personId;
  const person = route?.params?.person;
  const cardWidth = width - theme.spaces.md * 2;
  const { response, loading, error } = useFetch(
    `${baseUrl}${type}s/${personId}?populate=*`,
  );

  const departement = response?.departement?.name;
  const instance = response?.instances?.[0]?.name;

  return (
    <SContainer>
      <>
        <InitialsCircle text={`${person?.prenom[0]}${person?.nom[0]}`} />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: theme.font.sizes.lg,
            color: theme.colors.navy,
          }}
        >
          {person?.prenom} {person?.nom}
        </Text>
        {(departement || instance) && (
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {departement || instance}
          </Text>
        )}
        {person?.fonction && (
          <Text style={{ textAlign: 'center' }}>{person?.fonction}</Text>
        )}
      </>

      <View flexDirection="row" columnGap={theme.spaces.md}>
        {person?.tel && (
          <CardContact
            text="APPEL"
            onPress={() =>
              Linking.openURL(`tel:${person?.tel.replace(/\s/g, '')}`)
            }
            image={require('../assets/tel-bleu.png')}
          />
        )}

        {person?.email && (
          <CardContact
            width={20 * (500 / 369)}
            text="EMAIL"
            onPress={() => Linking.openURL(`mailto:${person?.email}`)}
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
          <View
            marginLeft={theme.spaces.lg}
            rowGap={theme.spaces.sm}
            padding={theme.spaces.lg}
          >
            <ContactInfo
              telMobile={person?.tel}
              email={person?.displayEmail || person?.email}
            />
            {person?.dossiers && (
              <View width={cardWidth - theme.spaces.lg * 2}>
                <View alignItems="center">
                  <View
                    borderBottomWidth={2}
                    paddingTop={theme.spaces.rg}
                    marginBottom={theme.spaces.rg}
                    borderBottomColor={theme.colors.inputGrey}
                    width="100%"
                  />
                </View>
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
                  {person?.dossiers}
                </Text>
              </View>
            )}
          </View>
        </Card>
      </View>
      <CustomTab />
    </SContainer>
  );
};

export default Contact;
