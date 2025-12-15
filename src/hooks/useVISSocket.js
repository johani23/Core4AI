import { useEffect } from "react";

export default function useVISSocket(onUpdate) {
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/vis-stream");
    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      if (data.type === "vis_update") onUpdate(data);
    };
    ws.onclose = () => console.warn("VIS socket closed");
    return () => ws.close();
  }, [onUpdate]);
}

