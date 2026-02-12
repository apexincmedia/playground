import React, { createContext, useContext, useMemo, useState } from 'react';

const HapticsContext = createContext(null);

export function HapticsProvider({ children }) {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  const value = useMemo(
    () => ({
      hapticsEnabled,
      setHapticsEnabled
    }),
    [hapticsEnabled]
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
