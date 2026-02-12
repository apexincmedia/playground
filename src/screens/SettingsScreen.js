import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useHapticsSettings } from '../context/HapticsContext';

export default function SettingsScreen() {
  const { hapticsEnabled, setHapticsEnabled } = useHapticsSettings();
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    Haptics.isAvailableAsync().then(setAvailable);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Enable haptics</Text>
            <Text style={styles.caption}>Disable to mute all tactile feedback in the app.</Text>
          </View>
          <Switch value={hapticsEnabled} onValueChange={setHapticsEnabled} />
        </View>

        <View style={styles.compatCard}>
          <Text style={styles.compatTitle}>Compatibility</Text>
          <Text style={styles.caption}>
            {available === null
              ? 'Checking support...'
              : available
                ? 'Haptics API is available on this device.'
                : 'This device reports limited/no haptic support. App will gracefully skip unsupported feedback.'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A0D16' },
  container: { padding: 18 },
  title: { color: '#FFF', fontSize: 26, fontWeight: '800', marginBottom: 18 },
  row: {
    backgroundColor: '#1A2033',
    borderColor: '#2A3459',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  caption: { color: '#A7AECC', marginTop: 4, maxWidth: 250 },
  compatCard: {
    marginTop: 16,
    backgroundColor: '#151A2A',
    borderColor: '#2A3459',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14
  },
  compatTitle: { color: '#FFF', fontWeight: '700', marginBottom: 4 }
});
