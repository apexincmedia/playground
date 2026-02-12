import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function HomeScreen({ onOpenSandbox, onOpenRhythm, onOpenSettings }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Haptic Playground</Text>
      <Text style={styles.subtitle}>
        Explore tactile patterns, compare haptic styles, and play a rhythm challenge.
      </Text>

      <PrimaryButton label="Haptic Sandbox" onPress={onOpenSandbox} />
      <PrimaryButton label="Rhythm Game" onPress={onOpenRhythm} />
      <PrimaryButton label="Settings" onPress={onOpenSettings} secondary />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#5F6C7B',
    marginBottom: 24,
  },
});
