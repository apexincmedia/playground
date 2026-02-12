import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HapticsProvider } from './src/context/HapticsContext';
import HomeScreen from './src/screens/HomeScreen';
import SandboxScreen from './src/screens/SandboxScreen';
import RhythmGameScreen from './src/screens/RhythmGameScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HapticsProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#10131F' },
            headerTintColor: '#FFFFFF',
            contentStyle: { backgroundColor: '#0A0D16' }
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Haptic Playground' }} />
          <Stack.Screen name="Sandbox" component={SandboxScreen} options={{ title: 'Haptic Sandbox' }} />
          <Stack.Screen name="RhythmGame" component={RhythmGameScreen} options={{ title: 'Rhythm Game' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </HapticsProvider>
  );
}
