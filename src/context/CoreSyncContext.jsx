import React, { createContext, useContext, useState } from 'react';

// Create Context
const CoreSyncContext = createContext();

// Custom hook to use CoreSync context
export function useCoreSync() {
  return useContext(CoreSyncContext);
}

// CoreSyncProvider component
export function CoreSyncProvider({ children }) {
  const [role, setRole] = useState(''); // Or any initial value for role
  
  return (
    <CoreSyncContext.Provider value={{ role, setRole }}>
      {children}
    </CoreSyncContext.Provider>
  );
}
