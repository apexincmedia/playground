# Haptic Playground (Expo + React Native)

A tactile-first React Native app that runs in **Expo Go** and demonstrates haptics as both a utility and game mechanic.

## I. Project Setup and Dependencies

```bash
npx create-expo-app haptic-playground
cd haptic-playground
npx expo install expo-haptics
npm start
```

> This repository already contains the starter structure and implementation for those requirements.

## II. App Structure (File Hierarchy)

```text
.
├── App.js
├── app.json
├── package.json
└── src
    ├── MainNavigator.js
    ├── components
    │   └── PrimaryButton.js
    ├── context
    │   └── HapticsContext.js
    ├── data
    │   └── hapticCatalog.js
    ├── screens
    │   ├── HomeScreen.js
    │   ├── RhythmGameScreen.js
    │   ├── SandboxScreen.js
    │   └── SettingsScreen.js
    └── utils
        └── haptics.js
```

## III. Screen Mockups / Description

### `HomeScreen.js`
- Navigation hub for the app.
- Offers three paths: **Sandbox**, **Rhythm Game**, and **Settings**.

### `SandboxScreen.js`
- Lists each haptic pattern available from `expo-haptics` with a short description.
- Each action has a tap button for direct side-by-side comparison.
- Includes **Phone Vibrator Mode** for repeated heavy-impact haptics.

### `RhythmGameScreen.js`
- Tap-timing game with a shrinking time window each round.
- Rewards success with haptics (notification success for perfect hits, impact medium for good hits).
- Displays round, score, timer, and game-state messaging.

### `SettingsScreen.js`
- Global **Enable Haptics** switch.
- Compatibility mode switch (kept in context for future fallback tuning).

## IV. Key Code Snippets & Logic

### 1) Haptics Utility (safe trigger)

```js
// src/utils/haptics.js
export async function safeTriggerHaptic({ enabled, action, fallback }) {
  if (!enabled) return { ok: false, reason: 'disabled' };

  try {
    await action();
    return { ok: true, reason: 'native' };
  } catch {
    if (fallback) {
      await fallback();
      return { ok: true, reason: 'fallback' };
    }
    return { ok: false, reason: 'unknown' };
  }
}
```

### 2) Sandbox Implementation (single haptic button)

```js
// src/screens/SandboxScreen.js
<PrimaryButton
  label={`Try ${action.label}`}
  onPress={() => triggerAction(action)}
/>
```

### 3) Settings with Context (global haptic state)

```js
// App.js
<HapticsProvider>
  <MainNavigator />
</HapticsProvider>

// src/context/HapticsContext.js
const [hapticsEnabled, setHapticsEnabled] = useState(true);
```

## Feature Note: Phone-as-Vibrator

The sandbox includes a **Phone Vibrator Mode** that loops heavy impacts in short intervals until stopped. This is intended for demonstration/prototyping and should be used responsibly to avoid overuse.
