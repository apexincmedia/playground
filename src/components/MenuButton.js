import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function MenuButton({ title, subtitle, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1B2033',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#283052'
  },
  title: {
    color: '#F5F6FA',
    fontWeight: '700',
    fontSize: 17
  },
  subtitle: {
    color: '#B6B8CC',
    marginTop: 4,
    fontSize: 13
  }
});
