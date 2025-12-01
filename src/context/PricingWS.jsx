import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const PricingWSContext = createContext();
export const usePricingWS = () => useContext(PricingWSContext);

export function PricingWSProvider({ children }) {
  const [liveData, setLiveData] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);

  const wsRef = useRef(null);
  const retryRef = useRef(null);

  const connect = () => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/pricing");
    wsRef.current = ws;

    ws.onopen = () => {
      setBackendConnected(true);
      // console.log("Pricing WS: Connected");
    };

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        setLiveData(data);
      } catch {
        console.warn("Invalid WS pricing message.");
      }
    };

    ws.onerror = () => {
      setBackendConnected(false);
      ws.close();
    };

    ws.onclose = () => {
      setBackendConnected(false);
      retryRef.current = setTimeout(connect, 1500); // Auto reconnect
    };
  };

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(retryRef.current);
      wsRef.current && wsRef.current.close();
    };
  }, []);

  return (
    <PricingWSContext.Provider value={{ liveData, backendConnected }}>
      {children}
    </PricingWSContext.Provider>
  );
}

