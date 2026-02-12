import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { triggerHaptic } from '../utils/haptics';

export default function HapticButton({ title, subtitle, action }) {
  const { hapticsEnabled } = useSettings();

  return (
    <Pressable
      style={styles.button}
      onPress={() => triggerHaptic({ enabled: hapticsEnabled, ...action })}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Text style={styles.cta}>Try</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: 'white', fontWeight: '700', fontSize: 16 },
  subtitle: { color: '#cbd5e1', marginTop: 4, maxWidth: 260 },
  cta: {
    color: '#93c5fd',
    fontWeight: '700',
    borderWidth: 1,
    borderColor: '#93c5fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
});
