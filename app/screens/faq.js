import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import CustomTab from '../components/customTab.js';
import useFetch from '../hooks/useFetch.js';
import theme from '../theme.js';

const SContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const FAQ = () => {
  const { response, loading, error } = useFetch(
    'http://localhost:1337/api/questions',
  );
  const content = useMemo(() => {
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    return response.data.map((question) => (
      <View key={question.id}>
        <Text>{question.title}</Text>
        <Text>{question.attributes.answer}</Text>
      </View>
    ));
  }, [response, loading, error]);

  return (
    <SContainer>
      {content}
      <CustomTab />
    </SContainer>
  );
};

export default FAQ;
