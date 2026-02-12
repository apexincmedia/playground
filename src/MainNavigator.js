import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import SandboxScreen from './screens/SandboxScreen';
import RhythmGameScreen from './screens/RhythmGameScreen';
import SettingsScreen from './screens/SettingsScreen';

const SCREENS = {
  HOME: 'home',
  SANDBOX: 'sandbox',
  RHYTHM: 'rhythm',
  SETTINGS: 'settings',
};

export default function MainNavigator() {
  const [screen, setScreen] = useState(SCREENS.HOME);

  if (screen === SCREENS.SANDBOX) {
    return <SandboxScreen onBack={() => setScreen(SCREENS.HOME)} />;
  }

  if (screen === SCREENS.RHYTHM) {
    return <RhythmGameScreen onBack={() => setScreen(SCREENS.HOME)} />;
  }

  if (screen === SCREENS.SETTINGS) {
    return <SettingsScreen onBack={() => setScreen(SCREENS.HOME)} />;
  }

  return (
    <HomeScreen
      onOpenSandbox={() => setScreen(SCREENS.SANDBOX)}
      onOpenRhythm={() => setScreen(SCREENS.RHYTHM)}
      onOpenSettings={() => setScreen(SCREENS.SETTINGS)}
    />
  );
}
