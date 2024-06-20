import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import CustomHeader from '../components/customHeader.js';
import { useAuth } from '../hooks/useAuth.js';
import Accueil from '../screens/accueil.js';
import Annuaire from '../screens/annuaire.js';
import ChangePasswordFirst from '../screens/changePasswordFirst.js';
import Contact from '../screens/contact.js';
import ContactInstance from '../screens/contactInstance.js';
import Contacts from '../screens/contacts.js';
import FAQ from '../screens/faq.js';
import ForgotPassword from '../screens/forgotPassword.js';
import Login from '../screens/login.js';
import Profil from '../screens/profil.js';
import Question from '../screens/question.js';
import theme from '../theme.js';

const Stack = createStackNavigator();

export default function Navigator() {
  const { isLoggedIn } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation, route }) => {
            return <CustomHeader navigation={navigation} route={route} />;
          },
          cardStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ChangePasswordFirst"
              component={ChangePasswordFirst}
            />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="Accueil" component={Accueil} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="Annuaire" component={Annuaire} />
            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name="Profil" component={Profil} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="Question" component={Question} />
            <Stack.Screen name="ContactInstance" component={ContactInstance} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
