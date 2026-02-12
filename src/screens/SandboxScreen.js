import React, { useMemo, useRef, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useHapticsSettings } from '../context/HapticsContext';
import { createVibratorLoop, triggerHaptic } from '../utils/haptics';

const HAPTIC_OPTIONS = [
  { label: 'Selection', description: 'Subtle tick for UI changes', action: { type: 'selection' } },
  { label: 'Impact Light', description: 'Tiny touch impact', action: { type: 'impact', impactStyle: 'light' } },
  { label: 'Impact Medium', description: 'Balanced tap sensation', action: { type: 'impact', impactStyle: 'medium' } },
  { label: 'Impact Heavy', description: 'Strong collision feel', action: { type: 'impact', impactStyle: 'heavy' } },
  { label: 'Success', description: 'Positive completion cue', action: { type: 'notification', notificationType: 'success' } },
  { label: 'Warning', description: 'Caution cue', action: { type: 'notification', notificationType: 'warning' } },
  { label: 'Error', description: 'Failure cue', action: { type: 'notification', notificationType: 'error' } }
];

export default function SandboxScreen() {
  const { hapticsEnabled } = useHapticsSettings();
  const [status, setStatus] = useState('Ready to test haptics.');
  const loopRef = useRef(null);

  const vibrator = useMemo(
    () => createVibratorLoop({ enabled: hapticsEnabled, intensity: 'heavy', intervalMs: 140 }),
    [hapticsEnabled]
  );

  const onTrigger = async (action) => {
    const result = await triggerHaptic({ enabled: hapticsEnabled, ...action });
    if (result.reason === 'disabled') {
      setStatus('Haptics are disabled in settings.');
    } else if (result.reason === 'unsupported') {
      setStatus('This device may not fully support haptic APIs.');
    } else {
      setStatus(`Played: ${action.type}`);
    }
  };

  const startVibratorMode = async () => {
    loopRef.current = vibrator;
    await loopRef.current.start();
    setStatus('Vibrator mode ON (continuous haptic pulses).');
  };

  const stopVibratorMode = () => {
    loopRef.current?.stop();
    setStatus('Vibrator mode OFF.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Haptic Sandbox</Text>
        <Text style={styles.caption}>{status}</Text>

        {HAPTIC_OPTIONS.map((item) => (
          <Pressable key={item.label} style={styles.card} onPress={() => onTrigger(item.action)}>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text style={styles.cardBody}>{item.description}</Text>
          </Pressable>
        ))}

        <View style={styles.vibratorContainer}>
          <Text style={styles.vibratorTitle}>Vibrator Mode</Text>
          <Text style={styles.cardBody}>Turn your phone into a tactile vibration tool with repeated heavy impacts.</Text>
          <View style={styles.row}>
            <Pressable style={styles.startButton} onPress={startVibratorMode}>
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
            <Pressable style={styles.stopButton} onPress={stopVibratorMode}>
              <Text style={styles.buttonText}>Stop</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A0D16' },
  container: { padding: 18, paddingBottom: 28 },
  header: { color: '#FFF', fontSize: 24, fontWeight: '800', marginBottom: 6 },
  caption: { color: '#9FA5C6', marginBottom: 14 },
  card: {
    backgroundColor: '#161C2B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2C375A',
    padding: 14,
    marginBottom: 10
  },
  cardTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 16, marginBottom: 4 },
  cardBody: { color: '#AAB0CC', fontSize: 13 },
  vibratorContainer: {
    marginTop: 18,
    backgroundColor: '#21132A',
    borderColor: '#5D3A7A',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14
  },
  vibratorTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 10, marginTop: 12 },
  startButton: { flex: 1, borderRadius: 10, backgroundColor: '#7D3BBD', padding: 10, alignItems: 'center' },
  stopButton: { flex: 1, borderRadius: 10, backgroundColor: '#3E465F', padding: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: '700' }
});
