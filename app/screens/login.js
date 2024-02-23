import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { useAuth } from '../hooks/useAuth';
import theme from '../theme';

const SContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-horizontal: ${theme.spaces.lg}px;
  justify-content: center;
`;

const STextError = styled.Text`
  color: ${theme.colors.danger};
  font-size: ${theme.font.sizes.sm}px;
  margin-top: 8px;
  margin-left: 18px;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isLoggedIn, updateIsLoggedIn, updateToken, updateUser } = useAuth();

  const navigation = useNavigation();

  // useEffect(() => {
  //   AsyncStorage.setItem('token', '');
  // }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigation.navigate('Accueil');
  //   }
  // }, [isLoggedIn, navigation]);

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        updateToken(token);
        fetch('http://localhost:1337/api/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) =>
          response.json().then((user) => {
            if (user?.id) {
              updateUser(user);
              updateIsLoggedIn(true);
            }
          }),
        );
      } else {
        updateToken('');
      }
    });
  }, [updateIsLoggedIn, updateToken, updateUser]);

  const handleUsernameChange = useCallback((username) => {
    setUsername(username);
  }, []);

  const handlePasswordChange = useCallback((password) => {
    setPassword(password);
  }, []);

  const handleSubmit = useCallback(() => {
    fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      body: JSON.stringify({
        identifier: username,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.jwt) {
          updateToken(json.jwt);
          updateUser(json.user);
          AsyncStorage.setItem('token', json.jwt);
          updateIsLoggedIn(true);
        } else if (json.error.message) {
          if (json.error.message.includes('password is a required field')) {
            setError('Le mot de passe est obligatoire');
          } else if (
            json.error.message.includes('Invalid identifier or password')
          ) {
            setError('Identifiant ou mot de passe incorrect');
          } else {
            setError(json.error.message);
          }
        }
      });
  }, [username, password, updateToken, updateUser, updateIsLoggedIn]);

  return (
    <SContainer>
      <View rowGap={theme.spaces.md} width="100%" alignItems="center">
        <Input
          placeholder="Identifiant"
          onChangeText={(val) => handleUsernameChange(val)}
        />
        <Input
          placeholder="Mot de passe"
          onChangeText={(val) => handlePasswordChange(val)}
          isPassword
        />
        <Button
          text="Se connecter"
          onPress={handleSubmit}
          disabled={username === '' || password === ''}
        />
        {error && <STextError>{error}</STextError>}
      </View>
    </SContainer>
  );
};

export default Login;
