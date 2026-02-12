import * as Haptics from 'expo-haptics';
import * as Device from 'expo-device';

export async function isLikelyHapticsSupported() {
  if (!Device.isDevice) return false;
  return true;
}

export async function triggerHaptic({ enabled, action, options }) {
  if (!enabled) return;

  const supported = await isLikelyHapticsSupported();
  if (!supported) return;

  switch (action) {
    case 'selection':
      await Haptics.selectionAsync();
      break;
    case 'impact':
      await Haptics.impactAsync(options?.style ?? Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'notification':
      await Haptics.notificationAsync(
        options?.type ?? Haptics.NotificationFeedbackType.Success
      );
      break;
    default:
      break;
  }
}
