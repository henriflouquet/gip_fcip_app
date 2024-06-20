import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useCallback } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import CustomTab from '../components/customTab.js';
import Card from '../components/ui/card.js';
import useFetch from '../hooks/useFetch.js';
import theme from '../theme.js';
const height = Dimensions.get('window').height;

const SContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${theme.spaces.lg}px;
  margin-bottom: ${height * 0.12}px;
`;

const FAQ = () => {
  const navigation = useNavigation();
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  const { response, loading, error } = useFetch(`${baseUrl}questions`);

  const navigateToQuestion = useCallback(
    (question) => {
      navigation.navigate('Question', {
        question: question.attributes,
      });
    },
    [navigation],
  );

  const content = useMemo(() => {
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    if (!response || !response.data || response.data.length === 0) {
      return <Text>No data</Text>;
    } else {
      return response.data.map((question, i) => (
        <View
          key={question.id}
          borderTopWidth={i === 0 ? 0 : 0.5}
          width="90%"
          borderRadus={theme.radius.lg}
          borderTopColor={theme.colors.grey4}
          paddingHorizontal={theme.spaces.lg}
          paddingVertical={theme.spaces.lg}
        >
          <TouchableOpacity onPress={() => navigateToQuestion(question)}>
            <Text style={{ fontSize: theme.font.sizes.lg }}>
              {question.attributes.title}
            </Text>
          </TouchableOpacity>
        </View>
      ));
    }
  }, [loading, error, response, navigateToQuestion]);
  return (
    <View flex={1}>
      <SContainer>
        <Card style={{ width: '100%' }} maxHeight={height * 0.7}>
          {content}
        </Card>
      </SContainer>
      <CustomTab />
    </View>
  );
};

export default FAQ;
