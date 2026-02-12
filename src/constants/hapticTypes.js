import * as Haptics from 'expo-haptics';

export const SANDBOX_ITEMS = [
  {
    key: 'selection',
    title: 'Selection',
    description: 'A subtle tick for UI selection changes.',
    action: { action: 'selection' },
  },
  {
    key: 'impactLight',
    title: 'Impact Light',
    description: 'Soft physical tap sensation.',
    action: {
      action: 'impact',
      options: { style: Haptics.ImpactFeedbackStyle.Light },
    },
  },
  {
    key: 'impactMedium',
    title: 'Impact Medium',
    description: 'Balanced impact pulse.',
    action: {
      action: 'impact',
      options: { style: Haptics.ImpactFeedbackStyle.Medium },
    },
  },
  {
    key: 'impactHeavy',
    title: 'Impact Heavy',
    description: 'Strong, punchy impact sensation.',
    action: {
      action: 'impact',
      options: { style: Haptics.ImpactFeedbackStyle.Heavy },
    },
  },
  {
    key: 'success',
    title: 'Notification Success',
    description: 'Positive completion feedback.',
    action: {
      action: 'notification',
      options: { type: Haptics.NotificationFeedbackType.Success },
    },
  },
  {
    key: 'warning',
    title: 'Notification Warning',
    description: 'Cautionary alert pulse.',
    action: {
      action: 'notification',
      options: { type: Haptics.NotificationFeedbackType.Warning },
    },
  },
  {
    key: 'error',
    title: 'Notification Error',
    description: 'Error/failure tactile pattern.',
    action: {
      action: 'notification',
      options: { type: Haptics.NotificationFeedbackType.Error },
    },
  },
];
