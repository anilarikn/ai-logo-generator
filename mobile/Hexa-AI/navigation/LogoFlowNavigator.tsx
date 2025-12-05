import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InputScreen from '../screens/InputScreen';
import OutputScreen from '../screens/OutputScreen';

export type LogoStackParamList = {
  Input: undefined;
  Output: {
    imageUrl: string;
    prompt: string;
    styleLabel: string;
  };
};

const Stack = createNativeStackNavigator<LogoStackParamList>();

export default function LogoFlowNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Input"
      >
        <Stack.Screen name="Input" component={InputScreen} />
        <Stack.Screen name="Output" component={OutputScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
