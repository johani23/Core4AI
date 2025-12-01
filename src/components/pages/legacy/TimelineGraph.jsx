import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TimelineGraph() {
  const [data, setData] = useState([]);
  const username = "user001";

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/timeline/${username}`)
      .then((res) => res.json())
      .then((records) =>
        setData(records.map((r) => ({ time: r.time.slice(11, 19), mood: r.mood })))
      );
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">ðŸ“Š Emotional Timeline</h1>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No data yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="#f43f5e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
