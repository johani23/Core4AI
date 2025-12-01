// ============================================================
// 💎 useLivePulse.js
// ------------------------------------------------------------
// Simple auto-refresh hook for live updates.
// It re-calls a callback every N milliseconds.
// ============================================================
import { useEffect } from "react";

export default function useLivePulse(callback, interval = 15000) {
  useEffect(() => {
    callback();                     // run immediately
    const id = setInterval(callback, interval);
    return () => clearInterval(id);
  }, [callback, interval]);
}
