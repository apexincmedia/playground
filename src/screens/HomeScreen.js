import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

function NavCard({ title, subtitle, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

export default function HomeScreen({ navigation }) {
  const { hapticsEnabled, vibratorModeEnabled } = useSettings();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Haptic Playground</Text>
      <Text style={styles.subtitle}>Play with touch feedback in tool mode or game mode.</Text>

      <View style={styles.badges}>
        <Text style={styles.badge}>Haptics: {hapticsEnabled ? 'On' : 'Off'}</Text>
        <Text style={styles.badge}>Vibrator Mode: {vibratorModeEnabled ? 'On' : 'Off'}</Text>
      </View>

      <NavCard
        title="Haptic Sandbox"
        subtitle="Trigger and compare each haptic type"
        onPress={() => navigation.navigate('Sandbox')}
      />
      <NavCard
        title="Rhythm Game"
        subtitle="Tap in time and feel the beat"
        onPress={() => navigation.navigate('Rhythm Game')}
      />
      <NavCard
        title="Settings"
        subtitle="Global toggles and compatibility"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subtitle: { color: '#334155', marginTop: 6, marginBottom: 20 },
  badges: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  badge: {
    backgroundColor: '#e2e8f0',
    color: '#0f172a',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { color: 'white', fontWeight: '700', fontSize: 18 },
  cardSubtitle: { color: '#cbd5e1', marginTop: 4 },
});
