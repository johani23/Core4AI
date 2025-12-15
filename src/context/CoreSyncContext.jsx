// ============================================================================
// 💚 Core4.AI – CoreSyncContext (Unified Role Engine)
// ----------------------------------------------------------------------------
// - Stores the selected user role globally
// - Syncs role with localStorage (core4_userRole)
// - Used by RoleRouter v2 for dynamic routing
// ============================================================================

import React, { createContext, useState, useContext } from "react";

// Create context container
const CoreSyncContext = createContext();

// Provider wrapper
export const CoreSyncProvider = ({ children }) => {
  const STORAGE_KEY = "core4_userRole";

  // Load role from localStorage or default to "buyer"
  const [role, setRoleState] = useState(
    localStorage.getItem(STORAGE_KEY) || "buyer"
  );

  // Update role in both state + localStorage
  const setRole = (newRole) => {
    setRoleState(newRole);
    localStorage.setItem(STORAGE_KEY, newRole);
  };

  return (
    <CoreSyncContext.Provider value={{ role, setRole }}>
      {children}
    </CoreSyncContext.Provider>
  );
};

// Custom hook to access role + setRole
export const useCoreSync = () => useContext(CoreSyncContext);
