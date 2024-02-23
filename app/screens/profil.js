import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import CustomTab from '../components/customTab.js';
import Button from '../components/ui/button.js';
import { useAuth } from '../hooks/useAuth.js';
import theme from '../theme.js';

const SContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Profil = () => {
  const { logout } = useAuth();
  return (
    <SContainer>
      <Text>Profil</Text>
      <Button
        text="Se déconnecter"
        onPress={() => {
          logout();
        }}
      />
      <CustomTab />
    </SContainer>
  );
};

export default Profil;
