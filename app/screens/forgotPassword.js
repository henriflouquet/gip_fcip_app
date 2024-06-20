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

const ForgotPassword = () => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [error, setError] = useState('');
  const { updateIsLoggedIn, updateToken, updateUser } = useAuth();

  const isEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = useCallback((val) => {
    setEmail(val);
  }, []);

  const handlePasswordChange = useCallback((val) => {
    setPassword(val);
  }, []);

  const handleResetCodeChange = useCallback((val) => {
    setResetCode(val);
  }, []);

  const handlePasswordConfirmationChange = useCallback((password) => {
    setPasswordConfirmation(password);
  }, []);

  const handleSubmitForgot = useCallback(() => {
    console.log('Submitting forgot password request for email:', email);
    fetch(`${baseUrl}auth/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError('Une erreur est survenue');
        }
        return response.json();
      })
      .then((json) => {
        if (json?.error?.message) {
          setError(json.error.message);
        } else {
          alert('Un email de réinitialisation a été envoyé');
          setError('');
        }
      })
      // eslint-disable-next-line node/handle-callback-err
      .catch((error) => {
        setError('Une erreur est survenue');
      });
  }, [email]);

  const handleResetPassword = useCallback(() => {
    try {
      fetch(`${baseUrl}auth/reset-password`, {
        method: 'POST',
        body: JSON.stringify({
          password,
          passwordConfirmation,
          code: resetCode,
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
            setError(json.error.message);
          } else {
            setError('Une erreur est survenue');
          }
        });
    } catch (error) {
      console.error('error', error);
    }
  }, [
    password,
    passwordConfirmation,
    resetCode,
    updateIsLoggedIn,
    updateToken,
    updateUser,
  ]);

  return (
    <SContainer>
      <View rowGap={theme.spaces.md} width="100%" alignItems="center">
        <Input
          placeholder="Email"
          onChangeText={(val) => handleEmailChange(val)}
        />
        <Input
          placeholder="Code de réinitialisation"
          onChangeText={(val) => handleResetCodeChange(val)}
          isPassword
        />
        <Input
          placeholder="Mot de passe"
          onChangeText={(val) => handlePasswordChange(val)}
          isPassword
        />
        <Input
          placeholder="Confirmation du mot de passe"
          onChangeText={(val) => handlePasswordConfirmationChange(val)}
          isPassword
        />
        <Button
          disabled={email === '' || !isEmail(email)}
          text="Envoyer un lien"
          onPress={handleSubmitForgot}
        />
        <Button
          disabled={
            email === '' ||
            password === '' ||
            passwordConfirmation === '' ||
            resetCode === '' ||
            password !== passwordConfirmation
          }
          text="Réinitialiser le mot de passe"
          onPress={handleResetPassword}
        />
        {error && <STextError>{error}</STextError>}
      </View>
    </SContainer>
  );
};

export default ForgotPassword;
