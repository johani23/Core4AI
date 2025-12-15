import React, { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [balance] = useState(72.5);

  return (
    <WalletContext.Provider value={{ balance }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}

export default WalletProvider;

