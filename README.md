# Haptic Playground (Expo + React Native)

Haptic Playground is a tactile-first React Native app built with Expo. It combines:

- **Haptic Sandbox** (tool mode): try and compare haptic styles.
- **Haptic Rhythm Game** (game mode): time taps to targets with haptic-confirmed feedback.
- **Settings**: globally enable/disable haptics and toggle a **Vibrator Mode**.

The project is designed to run in **Expo Go** for both iOS and Android without native build steps.

## I. Project Setup and Dependencies

### Initialize the Expo app

```bash
npx create-expo-app@latest haptic-playground --template blank
cd haptic-playground
```

### Install dependencies

```bash
npx expo install expo-haptics expo-device expo-status-bar
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
```

### Run in Expo Go

```bash
npx expo start
```

Scan the QR code from Expo Go on iOS/Android.

## II. App Structure (File Hierarchy)

```text
haptic-playground/
  App.js
  package.json
  babel.config.js
  src/
    components/
      HapticButton.js
      ScoreBadge.js
    constants/
      hapticTypes.js
    context/
      SettingsContext.js
    navigation/
      RootNavigator.js
    screens/
      HomeScreen.js
      SandboxScreen.js
      RhythmGameScreen.js
      SettingsScreen.js
    utils/
      haptics.js
      vibratorMode.js
```

## III. Screen Mockups / Description

### `HomeScreen.js` (Navigation hub)
- Landing screen with app title and three actions:
  - Open Sandbox
  - Play Rhythm Game
  - Open Settings
- Displays whether haptics are currently enabled.

### `SandboxScreen.js`
- Scrollable list of all major Expo haptic patterns with labels and descriptions.
- Each row has a button to trigger that exact haptic style.
- Designed for side-by-side tactile comparison.

### `RhythmGameScreen.js`
- Simple timing game with a moving target window.
- User taps “Hit!” when progress reaches target zone.
- Correct timing gives stronger/satisfying haptic confirmation and score increase.
- Misses trigger warning/error-style haptics.
- Difficulty ramps by shrinking the timing window and increasing speed.

### `SettingsScreen.js`
- Global switch for enabling/disabling all haptics.
- Device compatibility status (e.g., haptics available/not available).
- Toggle for **Vibrator Mode** (phone pulses repeatedly until turned off).

## IV. Key Code Snippets & Logic

### Haptics Utility (safe trigger + support checks)

- Uses global setting from context.
- Checks device capability and gracefully no-ops when unsupported.
- Centralized API keeps haptic behavior consistent across screens.

```js
// src/utils/haptics.js
import * as Haptics from 'expo-haptics';
import * as Device from 'expo-device';

export async function isLikelyHapticsSupported() {
  if (!Device.isDevice) return false;

  // On Android, vibrator-backed behavior exists broadly, but quality varies.
  // On iOS, Taptic Engine support is generally available on modern devices.
  return true;
}

export async function triggerHaptic({
  enabled,
  action,
  options,
}) {
  if (!enabled) return;
  const supported = await isLikelyHapticsSupported();
  if (!supported) return;

  switch (action) {
    case 'selection':
      return Haptics.selectionAsync();
    case 'impact':
      return Haptics.impactAsync(options?.style ?? Haptics.ImpactFeedbackStyle.Medium);
    case 'notification':
      return Haptics.notificationAsync(
        options?.type ?? Haptics.NotificationFeedbackType.Success
      );
    default:
      return;
  }
}
```

### Sandbox Example (single haptic button)

```js
import React from 'react';
import { Button } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../context/SettingsContext';
import { triggerHaptic } from '../utils/haptics';

export default function SandboxButtonExample() {
  const { hapticsEnabled } = useSettings();

  return (
    <Button
      title="Try Light Impact"
      onPress={() =>
        triggerHaptic({
          enabled: hapticsEnabled,
          action: 'impact',
          options: { style: Haptics.ImpactFeedbackStyle.Light },
        })
      }
    />
  );
}
```

### Settings Implementation (global state with Context)

```js
// src/context/SettingsContext.js
import React, { createContext, useContext, useMemo, useState } from 'react';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [vibratorModeEnabled, setVibratorModeEnabled] = useState(false);

  const value = useMemo(
    () => ({
      hapticsEnabled,
      setHapticsEnabled,
      vibratorModeEnabled,
      setVibratorModeEnabled,
    }),
    [hapticsEnabled, vibratorModeEnabled]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
```

## Vibrator Mode notes

- “Vibrator Mode” is implemented with repeated haptic pulses on a timer.
- This is **best-effort** in Expo Go and depends on OS/device behavior.
- Include explicit stop logic when navigating away or disabling mode.

See implementation in `src/utils/vibratorMode.js` and Settings/Rhythm integration.
