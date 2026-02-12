import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MenuButton from '../components/MenuButton';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Haptic Playground</Text>
        <Text style={styles.subtitle}>Learn, compare, and play with tactile feedback.</Text>

        <MenuButton
          title="Haptic Sandbox"
          subtitle="Try every haptic feedback type and compare sensations."
          onPress={() => navigation.navigate('Sandbox')}
        />
        <MenuButton
          title="Rhythm Game"
          subtitle="Tap in time and feel confirmations instead of relying on sound."
          onPress={() => navigation.navigate('RhythmGame')}
        />
        <MenuButton
          title="Settings"
          subtitle="Enable/disable haptics and review compatibility notes."
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A0D16' },
  container: { flex: 1, padding: 18 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginBottom: 10 },
  subtitle: { color: '#A0A6C4', marginBottom: 22, fontSize: 14 }
});
