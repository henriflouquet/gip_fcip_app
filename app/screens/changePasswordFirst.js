import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
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

const ChangePasswordFirst = ({ route }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const { token, user, updateToken, updateUser, updateIsLoggedIn } = useAuth();
  const navigation = useNavigation();

  const registrationCode = route?.params?.registrationCode;

  const handlePasswordChange = useCallback((password) => {
    setPassword(password);
  }, []);

  const handlePasswordConfirmationChange = useCallback((password) => {
    setPasswordConfirmation(password);
  }, []);

  const handleSuccessChange = useCallback(
    (json) => {
      try {
        fetch(`http://localhost:1337/api/users/${user.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${json.jwt}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            passwordChanged: true,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // updateToken(json.jwt);
            updateUser(data);
            // AsyncStorage.setItem('token', json.jwt);
            if (user?.accepted === false) {
              alert(
                'Mot de passe enregistré, votre compte va être validé par un administrateur',
              );
            } else {
              alert('Mot de passe enregistré');
            }
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              }),
            );
          });
      } catch (error) {
        console.error('error', error);
      }
    },
    [navigation, updateUser, user?.accepted, user.id],
  );

  const handleSubmit = useCallback(() => {
    try {
      fetch('http://localhost:1337/api/auth/change-password', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: registrationCode,
          password,
          passwordConfirmation,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('json password change', json);
          if (json.jwt) {
            handleSuccessChange(json);
          } else if (json.error.message) {
            setError(json.error.message);
          }
        });
    } catch (error) {
      console.error('error', error);
    }
  }, [
    token,
    registrationCode,
    password,
    passwordConfirmation,
    handleSuccessChange,
  ]);

  return (
    <SContainer>
      <View rowGap={theme.spaces.md} width="100%" alignItems="center">
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
          text="Se connecter"
          onPress={handleSubmit}
          disabled={password === '' || passwordConfirmation !== password}
        />
        {error && <STextError>{error}</STextError>}
      </View>
    </SContainer>
  );
};

export default ChangePasswordFirst;
