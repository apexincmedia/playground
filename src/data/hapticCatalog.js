import * as Haptics from 'expo-haptics';

export const HAPTIC_ACTIONS = [
  {
    id: 'selection',
    label: 'Selection',
    description: 'Very subtle click while moving through options.',
    run: () => Haptics.selectionAsync(),
  },
  {
    id: 'impact-light',
    label: 'Impact Light',
    description: 'Small physical bump for lightweight actions.',
    run: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  },
  {
    id: 'impact-medium',
    label: 'Impact Medium',
    description: 'Balanced bump for confirming interactions.',
    run: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  },
  {
    id: 'impact-heavy',
    label: 'Impact Heavy',
    description: 'Strong impact for high-value events.',
    run: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  },
  {
    id: 'notification-success',
    label: 'Notification Success',
    description: 'Positive pulse pattern for successful outcomes.',
    run: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  },
  {
    id: 'notification-warning',
    label: 'Notification Warning',
    description: 'Warning pulse for cautionary events.',
    run: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  },
  {
    id: 'notification-error',
    label: 'Notification Error',
    description: 'Error pulse pattern for failed actions.',
    run: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  },
];
