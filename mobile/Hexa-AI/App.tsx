import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import GradientBackground from './components/layout/GradientBackground';
import InputScreen from './screens/InputScreen'; 


export default function App() {
  return (
    <SafeAreaProvider>
      <GradientBackground>
        <StatusBar style="light" />
        <InputScreen />
      </GradientBackground>
    </SafeAreaProvider>
  );
}
