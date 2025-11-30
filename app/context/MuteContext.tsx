import React, { createContext, useContext, useState } from 'react';

interface MuteContextType {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const MuteContext = createContext<MuteContextType | undefined>(undefined);

export const MuteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  return (
    <MuteContext.Provider value={{ isMuted, setIsMuted }}>
      {children}
    </MuteContext.Provider>
  );
};

export function useMute() {
  const context = useContext(MuteContext);
  if (!context) throw new Error('useMute must be used within a MuteProvider');
  return context;
}
