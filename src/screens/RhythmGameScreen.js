import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../context/SettingsContext';
import { triggerHaptic } from '../utils/haptics';
import ScoreBadge from '../components/ScoreBadge';

export default function RhythmGameScreen() {
  const { hapticsEnabled } = useSettings();
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  const zoneSize = useMemo(() => Math.max(0.08, 0.2 - (level - 1) * 0.02), [level]);
  const speedMs = useMemo(() => Math.max(14, 24 - level), [level]);
  const zoneCenter = 0.5;

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.01 * direction;
        if (next >= 1) {
          setDirection(-1);
          return 1;
        }
        if (next <= 0) {
          setDirection(1);
          return 0;
        }
        return next;
      });
    }, speedMs);

    return () => clearInterval(id);
  }, [direction, speedMs]);

  const isInTarget = Math.abs(progress - zoneCenter) <= zoneSize / 2;

  const onHit = async () => {
    if (isInTarget) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setScore((s) => s + 10 + nextStreak);
      if (nextStreak % 5 === 0) setLevel((l) => Math.min(10, l + 1));
      await triggerHaptic({
        enabled: hapticsEnabled,
        action: 'impact',
        options: { style: Haptics.ImpactFeedbackStyle.Heavy },
      });
    } else {
      setStreak(0);
      await triggerHaptic({
        enabled: hapticsEnabled,
        action: 'notification',
        options: { type: Haptics.NotificationFeedbackType.Warning },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rhythm Game</Text>
      <Text style={styles.subtitle}>Tap "Hit!" when the marker is inside the blue zone.</Text>

      <ScoreBadge score={score} streak={streak} level={level} />

      <View style={styles.track}>
        <View
          style={[
            styles.targetZone,
            {
              width: `${zoneSize * 100}%`,
              left: `${(zoneCenter - zoneSize / 2) * 100}%`,
            },
          ]}
        />
        <View style={[styles.marker, { left: `${progress * 100}%` }]} />
      </View>

      <Pressable style={styles.hitBtn} onPress={onHit}>
        <Text style={styles.hitBtnText}>Hit!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 26, fontWeight: '800', color: '#0f172a' },
  subtitle: { color: '#475569', marginTop: 6, marginBottom: 14 },
  track: {
    height: 50,
    borderRadius: 14,
    backgroundColor: '#cbd5e1',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  targetZone: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#93c5fd',
  },
  marker: {
    position: 'absolute',
    width: 10,
    height: 50,
    marginLeft: -5,
    backgroundColor: '#1d4ed8',
  },
  hitBtn: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  hitBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
});
