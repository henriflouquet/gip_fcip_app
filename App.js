import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import CustomHeader from './app/components/custom-header.js';
import Accueil from './app/screens/accueil.js';
import Annuaire from './app/screens/annuaire.js';
import Contact from './app/screens/contact.js';
import Contacts from './app/screens/contacts.js';
import FAQ from './app/screens/faq.js';
import Profil from './app/screens/profil.js';
import theme from './app/theme.js';

const Stack = createStackNavigator();

export default function App() {
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
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="Annuaire" component={Annuaire} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
