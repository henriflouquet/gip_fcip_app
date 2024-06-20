import React from 'react';
import { Text, ScrollView, Linking } from 'react-native';
import styled from 'styled-components';

import CustomTab from '../components/customTab.js';
import Button from '../components/ui/button.js';
import { useAuth } from '../hooks/useAuth.js';
import theme from '../theme.js';

const SContainer = styled.View`
  flex: 1;
  padding-horizontal: ${theme.spaces.lg}px;
  row-gap: ${theme.spaces.lg}px;
  padding-top: ${theme.spaces.lg}px;
  align-items: center;
`;

const Question = ({ route }) => {
  const {
    title,
    answer,
    lien,
    contactEmail,
    contactTel,
    texteLien,
    texteContactTel,
  } = route?.params?.question;
  return (
    <>
      <ScrollView>
        <SContainer>
          <Text style={{ fontSize: theme.font.sizes.xl }}>{title}</Text>
          <Text style={{ textAlign: 'justify' }}>{answer}</Text>
          {lien && (
            <Button
              text={texteLien || lien}
              onPress={() => Linking.openURL(lien)}
            />
          )}
          {contactEmail && (
            <Button
              text={`Contacter par email: ${contactEmail}`}
              onPress={() => Linking.openURL(`mailto:${contactEmail}`)}
            />
          )}
          {contactTel && (
            <Button
              text={`Appeler ${texteContactTel || contactTel}`}
              onPress={() =>
                Linking.openURL(`tel:${contactTel.replace(/\s/g, '')}`)
              }
            />
          )}
        </SContainer>
      </ScrollView>
      <CustomTab />
    </>
  );
};

export default Question;
