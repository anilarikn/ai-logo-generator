import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import LogoFlowNavigator from './navigation/LogoFlowNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
        <StatusBar style="light" />
        <LogoFlowNavigator />
    </SafeAreaProvider>
  );
}
