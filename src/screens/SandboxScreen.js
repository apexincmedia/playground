import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HapticButton from '../components/HapticButton';
import { SANDBOX_ITEMS } from '../constants/hapticTypes';

export default function SandboxScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Haptic Sandbox</Text>
      <Text style={styles.subtitle}>Tap each row and compare the tactile feel.</Text>

      <View style={styles.list}>
        {SANDBOX_ITEMS.map((item) => (
          <HapticButton
            key={item.key}
            title={item.title}
            subtitle={item.description}
            action={item.action}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 26, fontWeight: '800', color: '#0f172a' },
  subtitle: { color: '#475569', marginTop: 6, marginBottom: 14 },
  list: { marginBottom: 30 },
});
