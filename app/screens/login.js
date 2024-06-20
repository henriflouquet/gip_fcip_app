import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { useAuth } from '../hooks/useAuth';
import useFetch from '../hooks/useFetch.js';
import theme from '../theme.js';

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
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const { isLoggedIn, updateIsLoggedIn, updateToken, user, updateUser } =
    useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      console.log('USER', user);
      if (user?.passwordChanged === true && user?.accepted === true) {
        updateIsLoggedIn(true);
        setPasswordCorrect(false);
      } else if (
        user?.passwordChanged === true &&
        user?.accepted === false &&
        passwordCorrect
      ) {
        alert('votre compte doit être validé par un administrateur');
        setPasswordCorrect(false);
      } else if (passwordCorrect && user?.passwordChanged === false) {
        setPasswordCorrect(false);
        navigation.navigate('ChangePasswordFirst', {
          registrationCode: password,
        });
      }
    }
  }, [
    isLoggedIn,
    navigation,
    password,
    passwordCorrect,
    updateIsLoggedIn,
    updateUser,
    user,
  ]);

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
            if (
              user?.id &&
              user?.passwordChanged === true &&
              user?.accepted === true
            ) {
              updateUser(user);
            } else {
              AsyncStorage.removeItem('token');
            }
          }),
        );
      }
    });
  }, [updateToken, updateUser]);

  const handleUsernameChange = useCallback((username) => {
    setUsername(username);
  }, []);

  const handlePasswordChange = useCallback((password) => {
    setPasswordCorrect(false);
    setPassword(password);
  }, []);

  const navigateToForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

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
          setPasswordCorrect(true);
          updateToken(json.jwt);
          updateUser(json.user);
          AsyncStorage.setItem('token', json.jwt);
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
  }, [username, password, updateToken, updateUser]);

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
        <TouchableOpacity onPress={navigateToForgotPassword}>
          <Text style={{ color: theme.colors.grey5 }}>
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>
        {error && <STextError>{error}</STextError>}
      </View>
    </SContainer>
  );
};

export default Login;
