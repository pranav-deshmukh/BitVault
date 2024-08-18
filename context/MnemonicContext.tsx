"use client"

import { createContext, useContext, useState, ReactNode } from "react";


interface MnemonicContextProps {
  mnemonic: string;
  setMnemonic: (mnemonic: string) => void;
}


const MnemonicContext = createContext<MnemonicContextProps | undefined>(undefined);


export function MnemonicProvider({ children }: { children: ReactNode }) {
  const [mnemonic, setMnemonic] = useState<string>("");

  return (
    <MnemonicContext.Provider value={{ mnemonic, setMnemonic }}>
      {children}
    </MnemonicContext.Provider>
  );
}
      

export function useMnemonic() {
  const context = useContext(MnemonicContext);
  if (!context) {
    throw new Error("useMnemonic must be used within a MnemonicProvider");
  }
  return context;
}
