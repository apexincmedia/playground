import React, { createContext, useContext, useMemo, useState } from 'react';

const HapticsContext = createContext(undefined);

export function HapticsProvider({ children }) {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [compatibilityMode, setCompatibilityMode] = useState(true);

  const value = useMemo(
    () => ({
      hapticsEnabled,
      setHapticsEnabled,
      compatibilityMode,
      setCompatibilityMode,
    }),
    [hapticsEnabled, compatibilityMode],
  );

  return <HapticsContext.Provider value={value}>{children}</HapticsContext.Provider>;
}

export function useHapticsSettings() {
  const context = useContext(HapticsContext);
  if (!context) {
    throw new Error('useHapticsSettings must be used inside HapticsProvider');
  }
  return context;
}
