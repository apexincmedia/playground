import * as Haptics from 'expo-haptics';

let vibrating = false;

export async function safeTriggerHaptic({ enabled, action, fallback }) {
  if (!enabled) {
    return { ok: false, reason: 'disabled' };
  }

  try {
    await action();
    return { ok: true, reason: 'native' };
  } catch (error) {
    if (fallback) {
      await fallback();
      return { ok: true, reason: 'fallback' };
    }
    return { ok: false, reason: error?.message ?? 'unsupported' };
  }
}

export async function startVibratorMode(enabled) {
  if (!enabled || vibrating) {
    return;
  }

  vibrating = true;

  while (vibrating) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await new Promise((resolve) => globalThis.setTimeout(resolve, 160));
  }
}

export function stopVibratorMode() {
  vibrating = false;
}
