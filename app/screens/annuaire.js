import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useCallback } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';

import ContactInfo from '../components/contact-info.js';
import CustomTab from '../components/custom-tab.js';
import InitialsCircle from '../components/initials-circle.js';
import SearchBar from '../components/search-bar.js';
import Card from '../components/ui/card.js';
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
  const navigation = useNavigation();

  const renderInstances = () => {
    const views = [];
    for (let i = 0; i < 30; i++) {
      views.push(
        <TouchableOpacity
          key={i}
          onPress={() => navigation.navigate('Contact', { type: 'instance' })}
        >
          <View
            flexDirection="row"
            columnGap={theme.spaces.md}
            alignItems="center"
          >
            <InitialsCircle
              text="O B"
              width={50}
              fontSize={theme.font.sizes.xl}
            />
            <Text
              style={{ flex: 1, fontWeight: 'bold', color: theme.colors.navy }}
            >
              Dispositif Académique de Validation des Acquis
            </Text>
          </View>
        </TouchableOpacity>,
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{
          width: cardWidth - theme.spaces.lg * 2,
          rowGap: theme.spaces.sm,
          paddingBottom: theme.spaces.lg,
        }}
      >
        <View
          height={2}
          marginVertical={theme.spaces.lg}
          backgroundColor={theme.colors.inputGrey}
          borderRadius={10}
        />
        {views}
      </ScrollView>
    );
  };

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
        <SearchBar />
        <View alignItems="center">
          <Card
            minWidth={cardWidth}
            paddingTop={theme.spaces.lg}
            alignItems="flex-start"
            maxHeight={height / 1.9}
          >
            <View
              marginLeft={theme.spaces.lg}
              rowGap={theme.spaces.sm}
              paddingTop={theme.spaces.lg}
            >
              <ContactInfo telMobile="06 03 26 49 76" email="test@gmail.com" />
              {renderInstances()}
            </View>
          </Card>
        </View>
      </SContentContainer>
      <CustomTab />
    </SContainer>
  );
};

export default Annuaire;
