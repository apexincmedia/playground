import * as Haptics from 'expo-haptics';

let intervalId = null;

export function startVibratorMode({ enabled }) {
  if (!enabled || intervalId) return;

  intervalId = setInterval(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch {
      // no-op fallback
    }
  }, 700);
}

export function stopVibratorMode() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
