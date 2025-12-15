// ============================================================
// Ã°Å¸â€™Å½ Core4.AI Ã¢â‚¬â€œ useCore4Socket (MVP-60 Integrated Edition)
// ------------------------------------------------------------
// Ã¢Å“â€¦ Seamless bridge between React components and FastAPI WebSocket
// Ã¢Å“â€¦ Auto-reconnect + simple message handler interface
// ============================================================

import { useEffect, useRef } from "react";

export default function useCore4Socket(onMessage, tribeId = "Core4AI-001") {
  const socketRef = useRef(null);

  useEffect(() => {
    // Ã°Å¸Å’Â Connect to backend WebSocket
    const connect = () => {
      const ws = new WebSocket(`ws://127.0.0.1:8000/ws/tribe/${tribeId}`);
      socketRef.current = ws;

      ws.onopen = () => console.log(`[Core4.AI] Connected to tribe ${tribeId}`);
      ws.onclose = () => {
        console.warn("[Core4.AI] Disconnected. Reconnecting in 2s...");
        setTimeout(connect, 2000);
      };

      ws.onerror = (err) => console.error("[Core4.AI] Socket error:", err);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Ã°Å¸Â§Â© Normalized message structure for compatibility with old hooks
          if (data.tribe_id && data.mood !== undefined) {
            onMessage({
              type: "tribe_update",
              tribes: [
                {
                  name: data.tribe_id,
                  mood_index: data.mood * 100,
                },
              ],
            });
          }
        } catch (e) {
          console.error("Failed to parse WS message:", e);
        }
      };
    };

    connect();

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, [tribeId]);

  // Optional: expose send() for future extensions
  const sendMessage = (msg) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    }
  };

  return { sendMessage };
}

