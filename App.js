import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { HapticsProvider } from './src/context/HapticsContext';
import MainNavigator from './src/MainNavigator';

export default function App() {
  return (
    <HapticsProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <MainNavigator />
      </SafeAreaView>
    </HapticsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
});
