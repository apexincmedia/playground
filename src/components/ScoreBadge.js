import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ScoreBadge({ score, streak, level }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>Score: {score}</Text>
      <Text style={styles.text}>Streak: {streak}</Text>
      <Text style={styles.text}>Level: {level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
});
