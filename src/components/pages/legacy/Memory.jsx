// ============================================================
// ðŸ’Ž Core4.AI â€“ Memory.jsx (MVP-81.8 â€œDopamine Heatwaveâ€)
// ------------------------------------------------------------
// âœ… Displays dopamine timeline from unified WS
// âœ… Uses Recharts for smooth animated curve
// ============================================================

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Memory() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/unified");
    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      if (d.event === "system_update" && d.history) {
        setPoints(
          d.history.map((h) => ({
            tribe: h.tribe,
            dopamine: h.dopamine,
            time: new Date(h.time).toLocaleTimeString(),
          }))
        );
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-fuchsia-400 text-center">
        ðŸ§  Dopamine Heatwave (Last 60 s)
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={points}>
          <XAxis dataKey="time" hide />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line type="monotone" dataKey="dopamine" stroke="#f472b6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
