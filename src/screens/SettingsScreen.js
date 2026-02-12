import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useHapticsSettings } from '../context/HapticsContext';

export default function SettingsScreen({ onBack }) {
  const {
    hapticsEnabled,
    setHapticsEnabled,
    compatibilityMode,
    setCompatibilityMode,
  } = useHapticsSettings();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <View style={styles.textWrap}>
          <Text style={styles.label}>Enable Haptics</Text>
          <Text style={styles.description}>Turn all haptic events on or off globally.</Text>
        </View>
        <Switch value={hapticsEnabled} onValueChange={setHapticsEnabled} />
      </View>

      <View style={styles.row}>
        <View style={styles.textWrap}>
          <Text style={styles.label}>Compatibility Mode</Text>
          <Text style={styles.description}>Prefer safer patterns on low-capability devices.</Text>
        </View>
        <Switch value={compatibilityMode} onValueChange={setCompatibilityMode} />
      </View>

      <PrimaryButton label="Back" onPress={onBack} secondary />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
  },
  textWrap: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    fontWeight: '600',
    marginBottom: 3,
  },
  description: {
    color: '#5F6C7B',
    fontSize: 13,
  },
});
