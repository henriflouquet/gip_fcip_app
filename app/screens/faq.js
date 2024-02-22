import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import CustomTab from '../components/custom-tab.js';
import theme from '../theme.js';

const SContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const FAQ = () => {
  return (
    <SContainer>
      <Text>FAQ</Text>
      <CustomTab />
    </SContainer>
  );
};

export default FAQ;
