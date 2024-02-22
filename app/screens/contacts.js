import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, Text, View, TouchableOpacity } from 'react-native';
import { AlphabetList } from 'react-native-section-alphabet-list';
import styled from 'styled-components';

import CustomTab from '../components/custom-tab.js';
import SearchBar from '../components/search-bar.js';
import theme from '../theme.js';

const { height } = Dimensions.get('window');

const data = [
  { value: 'Lillie-Mai Allen', key: '1' },
  { value: 'Emmanuel Goldstein', key: '2' },
  { value: 'Winston Smith', key: '3' },
  { value: 'William Blazkowicz', key: '4' },
  { value: 'Gordon Comstock', key: '5' },
  { value: 'Philip Ravelston', key: '6' },
  { value: 'Rosemary Waterlow', key: '7' },
  { value: 'Julia Comstock', key: '8' },
  { value: 'Mihai Maldonado', key: '9' },
  { value: 'Murtaza Molina', key: '10' },
  { value: 'Peter Petigrew', key: '11' },
  { value: 'Mihai Maldonado', key: '12' },
  { value: 'Murtaza Molina', key: '13' },
  { value: 'Peter Petigrew', key: '14' },
  { value: 'Mihai Maldonado', key: '15' },
  { value: 'Murtaza Molina', key: '16' },
  { value: 'Peter Petigrew', key: '17' },
  { value: 'Mihai Maldonado', key: '18' },
  { value: 'Murtaza Molina', key: '19' },
  { value: 'Peter Petigrew', key: '20' },
  { value: 'Mihai Maldonado', key: '21' },
  { value: 'Murtaza Molina', key: '22' },
  { value: 'Peter Petigrew', key: '23' },
];

const SContainer = styled.View`
  flex: 1;
`;

const SContentContainer = styled.View`
  padding-horizontal: ${theme.spaces.lg}px;
  margin-bottom: ${height * 0.12}px;
  padding-bottom: ${theme.spaces.lg}px;
`;

const Contacts = () => {
  const navigation = useNavigation();
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
        <SearchBar />
        <View
          paddingHorizontal={theme.spaces.md}
          height={height - height * 0.12 - 270}
        >
          <AlphabetList
            data={data}
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
                style={{ padding: theme.spaces.sm }}
                onPress={() =>
                  navigation.navigate('Contact', { name: item.value })
                }
              >
                <Text>{item.value}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SContentContainer>
      <CustomTab />
    </SContainer>
  );
};

export default Contacts;
