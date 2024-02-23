import 'react-native-gesture-handler';

import React from 'react';

import { AuthProvider } from './app/hooks/useAuth.js';
import Navigator from './app/navigation/navigator.js';

export default function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
