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
  if (!ctx) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }
  return ctx;
}
