import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import styled from 'styled-components';

import CardContact from '../components/card-contact.js';
import ContactInfo from '../components/contact-info.js';
import InitialsCircle from '../components/initials-circle.js';
import Card from '../components/ui/card.js';
import theme from '../theme.js';

const width = Dimensions.get('window').width;

const SContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-horizontal: ${theme.spaces.md}px;
  row-gap: ${theme.spaces.md}px;
`;
const SRound = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${theme.colors.navy};
  align-items: center;
  justify-content: center;
`;

const Contact = ({ navigation, route }) => {
  const type = route?.params?.type || 'contact';

  return (
    <SContainer>
      {type === 'contact' ? (
        <>
          <InitialsCircle text="O B" />
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
          <Text style={{ textAlign: 'center' }}>
            Assistante administrative chargée de la gestion des contrats
            d'apprentissage OPCO
          </Text>
        </>
      ) : (
        <View rowGap={theme.spaces.sm} alignItems="center">
          <Image
            source={require('../assets/departement-coul.png')}
            style={{ width: 70, height: 70 }}
          />
          <Text
            style={{ color: theme.colors.blue, fontSize: theme.font.sizes.lg }}
          >
            Département Apprentissage
          </Text>
        </View>
      )}

      <View flexDirection="row" columnGap={theme.spaces.md}>
        <CardContact text="APPEL" image={require('../assets/tel-bleu.png')} />
        <CardContact text="MESSAGE" image={require('../assets/sms-bleu.png')} />
        <CardContact
          width={20 * (500 / 369)}
          text="EMAIL"
          image={require('../assets/mail-bleu.png')}
        />
      </View>
      <Card
        minWidth={width - theme.spaces.md * 2}
        minHeight={0}
        paddingVertical={theme.spaces.lg}
        alignItems="flex-start"
      >
        <View marginLeft={theme.spaces.lg} rowGap={theme.spaces.sm}>
          <ContactInfo telMobile="06 03 26 49 76" email="test@gmail.com" />
        </View>
      </Card>
    </SContainer>
  );
};

export default Contact;
