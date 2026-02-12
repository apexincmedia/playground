import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { isLikelyHapticsSupported } from '../utils/haptics';
import { startVibratorMode, stopVibratorMode } from '../utils/vibratorMode';

export default function SettingsScreen() {
  const {
    hapticsEnabled,
    setHapticsEnabled,
    vibratorModeEnabled,
    setVibratorModeEnabled,
  } = useSettings();
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    isLikelyHapticsSupported().then(setIsSupported);
  }, []);

  useEffect(() => {
    if (vibratorModeEnabled) {
      startVibratorMode({ enabled: hapticsEnabled });
    } else {
      stopVibratorMode();
    }

    return () => stopVibratorMode();
  }, [vibratorModeEnabled, hapticsEnabled]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.rowTitle}>Enable haptics</Text>
          <Text style={styles.rowSub}>Global toggle for all app feedback.</Text>
        </View>
        <Switch value={hapticsEnabled} onValueChange={setHapticsEnabled} />
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.rowTitle}>Vibrator mode</Text>
          <Text style={styles.rowSub}>Repeated heavy pulses while enabled.</Text>
        </View>
        <Switch value={vibratorModeEnabled} onValueChange={setVibratorModeEnabled} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Compatibility</Text>
        <Text style={styles.panelText}>Likely haptics support: {isSupported ? 'Yes' : 'No'}</Text>
        <Text style={styles.panelText}>
          Note: actual tactile output depends on device hardware and OS settings.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 26, fontWeight: '800', color: '#0f172a', marginBottom: 10 },
  row: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  rowSub: { color: '#475569', marginTop: 2, maxWidth: 240 },
  panel: {
    backgroundColor: '#e2e8f0',
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
  },
  panelTitle: { fontWeight: '800', color: '#0f172a', marginBottom: 4 },
  panelText: { color: '#334155' },
});
