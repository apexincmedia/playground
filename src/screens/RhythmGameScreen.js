import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import PrimaryButton from '../components/PrimaryButton';
import { useHapticsSettings } from '../context/HapticsContext';
import { safeTriggerHaptic } from '../utils/haptics';

const BASE_WINDOW = 900;

export default function RhythmGameScreen({ onBack }) {
  const { hapticsEnabled } = useHapticsSettings();
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BASE_WINDOW);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('Tap start and hit TAP inside each timing window.');

  const difficultyWindow = useMemo(() => Math.max(250, BASE_WINDOW - round * 70), [round]);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const start = Date.now();
    const timer = globalThis.setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, difficultyWindow - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        globalThis.clearInterval(timer);
        setMessage('Missed! Game over.');
        setIsPlaying(false);
      }
    }, 30);

    return () => globalThis.clearInterval(timer);
  }, [difficultyWindow, isPlaying, round]);

  const handleTap = async () => {
    if (!isPlaying) return;

    const hitQuality = timeLeft > difficultyWindow * 0.4 ? 'perfect' : 'good';
    const points = hitQuality === 'perfect' ? 10 : 5;

    setScore((prev) => prev + points);
    setRound((prev) => prev + 1);
    setTimeLeft(Math.max(250, BASE_WINDOW - (round + 1) * 70));

    const action =
      hitQuality === 'perfect'
        ? () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        : () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    await safeTriggerHaptic({ enabled: hapticsEnabled, action });
    setMessage(hitQuality === 'perfect' ? 'Perfect!' : 'Good hit!');
  };

  const startGame = () => {
    setRound(1);
    setScore(0);
    setTimeLeft(BASE_WINDOW);
    setIsPlaying(true);
    setMessage('Go! Tap before the timer reaches zero.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rhythm Game</Text>
      <Text style={styles.meta}>Round: {round}</Text>
      <Text style={styles.meta}>Score: {score}</Text>
      <Text style={styles.meta}>Time Left: {Math.ceil(timeLeft)}ms</Text>
      <Text style={styles.message}>{message}</Text>

      <PrimaryButton label="Start / Restart" onPress={startGame} />
      <PrimaryButton label="TAP" onPress={handleTap} />
      <PrimaryButton label="Back" onPress={onBack} secondary />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  meta: {
    textAlign: 'center',
    marginBottom: 4,
  },
  message: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#5F6C7B',
  },
});
