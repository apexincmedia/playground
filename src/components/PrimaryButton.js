import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function PrimaryButton({ label, onPress, secondary = false }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, secondary && styles.secondary]}>
      <Text style={[styles.label, secondary && styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2F80ED',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  secondary: {
    backgroundColor: '#E9EEF7',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryLabel: {
    color: '#1A1A1A',
  },
});
