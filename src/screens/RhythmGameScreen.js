import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useHapticsSettings } from '../context/HapticsContext';
import { triggerHaptic } from '../utils/haptics';

function randomBeat(level) {
  const min = Math.max(450, 1000 - level * 70);
  const max = Math.max(min + 40, 1400 - level * 60);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function RhythmGameScreen() {
  const { hapticsEnabled } = useHapticsSettings();
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [targetTime, setTargetTime] = useState(Date.now() + 1200);
  const [message, setMessage] = useState('Wait for GO, then tap!');
  const [state, setState] = useState('waiting');

  const tolerance = useMemo(() => Math.max(220 - round * 12, 80), [round]);

  useEffect(() => {
    const nextTime = Date.now() + randomBeat(round);
    setTargetTime(nextTime);
    setState('waiting');
    setMessage('Wait for GO, then tap!');

    const timer = setTimeout(() => {
      setState('go');
      setMessage('GO! TAP NOW');
    }, nextTime - Date.now());

    return () => clearTimeout(timer);
  }, [round]);

  const onTap = async () => {
    if (state !== 'go') {
      setMessage('Too early! Wait for GO.');
      await triggerHaptic({ enabled: hapticsEnabled, type: 'notification', notificationType: 'warning' });
      return;
    }

    const delta = Math.abs(Date.now() - targetTime);

    if (delta <= tolerance) {
      const gained = Math.max(10, 100 - delta);
      setScore((prev) => prev + gained);
      setMessage(`Perfect! +${gained} points`);
      await triggerHaptic({ enabled: hapticsEnabled, type: 'impact', impactStyle: 'heavy' });
    } else {
      setMessage(`Missed by ${delta}ms`);
      await triggerHaptic({ enabled: hapticsEnabled, type: 'notification', notificationType: 'error' });
    }

    setRound((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Rhythm Haptics</Text>
        <Text style={styles.meta}>Round: {round}</Text>
        <Text style={styles.meta}>Score: {score}</Text>
        <Text style={[styles.signal, state === 'go' ? styles.go : styles.wait]}>{message}</Text>

        <Pressable style={styles.tapPad} onPress={onTap}>
          <Text style={styles.tapText}>TAP</Text>
        </Pressable>

        <Text style={styles.hint}>Difficulty scales each round with tighter timing windows.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A0D16' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#FFF', fontSize: 28, fontWeight: '800', marginBottom: 18 },
  meta: { color: '#BBC1DD', marginBottom: 4, fontWeight: '600' },
  signal: {
    marginTop: 12,
    marginBottom: 24,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center'
  },
  go: { color: '#6BFF9A' },
  wait: { color: '#FFCB70' },
  tapPad: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#273052',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#435182'
  },
  tapText: { color: '#FFF', fontWeight: '900', fontSize: 34 },
  hint: { color: '#9EA6C8', marginTop: 20, textAlign: 'center' }
});
