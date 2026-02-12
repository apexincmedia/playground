# Haptic Playground (Expo + React Native)

A tactile-first React Native app that runs in **Expo Go** and demonstrates `expo-haptics` through a sandbox, rhythm game, and settings controls.

## I. Project Setup and Dependencies

```bash
npx create-expo-app haptic-playground
cd haptic-playground
npx expo install expo-haptics expo-status-bar react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/native-stack
npm start
```

## II. App Structure (File Hierarchy)

```txt
haptic-playground/
├── App.js
├── package.json
├── README.md
└── src/
    ├── components/
    │   └── MenuButton.js
    ├── context/
    │   └── HapticsContext.js
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── RhythmGameScreen.js
    │   ├── SandboxScreen.js
    │   └── SettingsScreen.js
    └── utils/
        └── haptics.js
```

## III. Screen Mockups / Description

### HomeScreen.js
- Navigation hub with 3 cards:
  - Haptic Sandbox
  - Rhythm Game
  - Settings
- Intro text explains the app's tactile-first design.

### SandboxScreen.js
- List of test buttons for each haptic type:
  - Selection
  - Impact (light/medium/heavy)
  - Notification (success/warning/error)
- Status area tells user whether haptic played, was disabled, or unsupported.
- Includes **Vibrator Mode** (start/stop) that repeats heavy impact haptics to simulate vibration.

### RhythmGameScreen.js
- Timing game with a waiting phase and a "GO" prompt.
- User taps at the right moment.
- Score and rounds increase over time.
- Difficulty increases by tightening timing tolerance.
- Success/failure feedback uses haptics, not sound.

### SettingsScreen.js
- Global toggle to enable/disable haptics.
- Compatibility card shows current device support using `Haptics.isAvailableAsync()`.

## IV. Key Code Snippets & Logic

### Haptics Utility (safe wrapper)

```js
export async function triggerHaptic({ enabled, type = 'selection', impactStyle = 'medium', notificationType = 'success' }) {
  if (!enabled) return { played: false, reason: 'disabled' };

  const available = await Haptics.isAvailableAsync();
  if (!available) return { played: false, reason: 'unsupported' };

  if (type === 'selection') await Haptics.selectionAsync();
  if (type === 'impact') await Haptics.impactAsync(ImpactMap[impactStyle]);
  if (type === 'notification') await Haptics.notificationAsync(NotificationMap[notificationType]);

  return { played: true };
}
```

### Sandbox Example Button

```js
<Pressable onPress={() => onTrigger({ type: 'impact', impactStyle: 'light' })}>
  <Text>Impact Light</Text>
</Pressable>
```

### Settings Context (global haptics state)

```js
const [hapticsEnabled, setHapticsEnabled] = useState(true);

<HapticsContext.Provider value={{ hapticsEnabled, setHapticsEnabled }}>
  {children}
</HapticsContext.Provider>
```

---

## Optional "Full-Stack" Extension (Later)

When you want backend support, add:
- `server/` with Node + Express
- endpoints for leaderboard (`GET /scores`, `POST /scores`)
- persist rhythm high scores (SQLite/Postgres)
- fetch scores from app using `fetch` or React Query

This is optional for Expo Go development; current app runs fully client-side.
