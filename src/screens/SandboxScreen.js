import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { HAPTIC_ACTIONS } from '../data/hapticCatalog';
import { useHapticsSettings } from '../context/HapticsContext';
import { safeTriggerHaptic, startVibratorMode, stopVibratorMode } from '../utils/haptics';

export default function SandboxScreen({ onBack }) {
  const { hapticsEnabled } = useHapticsSettings();
  const [status, setStatus] = useState('Tap an item to feel haptic feedback.');
  const [isVibratorModeOn, setIsVibratorModeOn] = useState(false);

  const triggerAction = async (action) => {
    const result = await safeTriggerHaptic({
      enabled: hapticsEnabled,
      action: action.run,
    });

    setStatus(
      result.ok
        ? `Triggered: ${action.label} (${result.reason})`
        : `Skipped: ${action.label} (${result.reason})`,
    );
  };

  const toggleVibratorMode = async () => {
    if (isVibratorModeOn) {
      stopVibratorMode();
      setIsVibratorModeOn(false);
      setStatus('Vibrator mode stopped.');
      return;
    }

    setIsVibratorModeOn(true);
    setStatus('Vibrator mode started. Tap again to stop.');
    await startVibratorMode(hapticsEnabled);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Haptic Sandbox</Text>
      <Text style={styles.description}>
        Compare every haptic style available in Expo Go and use the phone-as-vibrator experiment.
      </Text>

      {HAPTIC_ACTIONS.map((action) => (
        <View key={action.id} style={styles.card}>
          <Text style={styles.cardTitle}>{action.label}</Text>
          <Text style={styles.cardDescription}>{action.description}</Text>
          <PrimaryButton label={`Try ${action.label}`} onPress={() => triggerAction(action)} />
        </View>
      ))}

      <View style={styles.vibratorCard}>
        <Text style={styles.cardTitle}>Phone Vibrator Mode</Text>
        <Text style={styles.cardDescription}>
          Continuous heavy impacts in short intervals. Use responsibly.
        </Text>
        <PrimaryButton
          label={isVibratorModeOn ? 'Stop Vibrator Mode' : 'Start Vibrator Mode'}
          onPress={toggleVibratorMode}
        />
      </View>

      <Text style={styles.status}>{status}</Text>
      <PrimaryButton label="Back" onPress={onBack} secondary />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: '#5F6C7B',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  vibratorCard: {
    borderColor: '#2F80ED',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#5F6C7B',
    marginBottom: 8,
  },
  status: {
    marginBottom: 12,
    color: '#1A1A1A',
  },
});
