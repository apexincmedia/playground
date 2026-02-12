import * as Haptics from 'expo-haptics';

const ImpactMap = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
  rigid: Haptics.ImpactFeedbackStyle.Rigid,
  soft: Haptics.ImpactFeedbackStyle.Soft
};

const NotificationMap = {
  success: Haptics.NotificationFeedbackType.Success,
  warning: Haptics.NotificationFeedbackType.Warning,
  error: Haptics.NotificationFeedbackType.Error
};

export async function triggerHaptic({
  enabled,
  type = 'selection',
  impactStyle = 'medium',
  notificationType = 'success'
}) {
  if (!enabled) {
    return { played: false, reason: 'disabled' };
  }

  const available = await Haptics.isAvailableAsync();
  if (!available) {
    return { played: false, reason: 'unsupported' };
  }

  if (type === 'selection') {
    await Haptics.selectionAsync();
    return { played: true };
  }

  if (type === 'impact') {
    const style = ImpactMap[impactStyle] ?? Haptics.ImpactFeedbackStyle.Medium;
    await Haptics.impactAsync(style);
    return { played: true };
  }

  if (type === 'notification') {
    const feedback = NotificationMap[notificationType] ?? Haptics.NotificationFeedbackType.Success;
    await Haptics.notificationAsync(feedback);
    return { played: true };
  }

  return { played: false, reason: 'unknown_type' };
}

export function createVibratorLoop({ enabled, intensity = 'heavy', intervalMs = 180 }) {
  let timer;
  const start = async () => {
    if (!enabled) {
      return;
    }

    await triggerHaptic({ enabled, type: 'impact', impactStyle: intensity });
    timer = setInterval(() => {
      triggerHaptic({ enabled, type: 'impact', impactStyle: intensity });
    }, intervalMs);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  return { start, stop };
}
