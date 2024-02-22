import React from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components';

import Card from './ui/card.js';
import theme from '../theme';

const SRound = styled.View`
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  border-radius: ${({ width }) => width / 2}px;
  background-color: ${theme.colors.navy};
  align-items: center;
  justify-content: center;
`;

const InitialsCircle = ({
  text,
  width = 80,
  fontSize = theme.font.sizes.xxl,
}) => {
  return (
    <SRound width={width}>
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize,
        }}
      >
        {text}
      </Text>
    </SRound>
  );
};

export default InitialsCircle;
