// ============================================================
// 💎 Core4.AI – useGlobalStream Hook (MVP-38.5)
// ------------------------------------------------------------
// Connects to ws://127.0.0.1:8000/ws/global
// Streams live data for market trend, tribe mood & wisdom index
// ============================================================

import { useEffect, useState } from "react";

export default function useGlobalStream() {
  const [data, setData] = useState({
    trend: "neutral",
    tribe_delta: 0,
    wisdom_index: 0.5,
    energy: 50,
    tribes: [],
  });

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/global");

    ws.onopen = () => console.log("🟢 Global stream connected");
    ws.onclose = () => console.log("🔴 Global stream closed");
    ws.onerror = (err) => console.error("⚠️ Global stream error", err);

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === "global_update") {
          setData((prev) => ({
            ...prev,
            trend: msg.trend,
            tribe_delta: msg.tribe_delta,
            wisdom_index: msg.wisdom_index,
            energy: msg.energy,
          }));
        } else if (msg.type === "tribe_update") {
          setData((prev) => ({
            ...prev,
            tribes: msg.tribes,
          }));
        }
      } catch (err) {
        console.warn("Stream parse error:", err);
      }
    };

    return () => ws.close();
  }, []);

  return data;
}
