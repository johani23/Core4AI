import React, { useEffect, useState } from "react";
import axios from "axios";

function Clusters() {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/clusters").then((res) => setClusters(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">ðŸ“‘ Clusters</h2>
      <table className="w-3/4 mx-auto border-collapse bg-white shadow rounded-xl">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 border">Ø§Ù„Ù…Ø¹Ø±Ù</th>
            <th className="p-3 border">Ø§Ù„Ø§Ø³Ù…</th>
            <th className="p-3 border">Ø§Ù„ÙˆØµÙ</th>
          </tr>
        </thead>
        <tbody>
          {clusters.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-3 border">{c.id}</td>
              <td className="p-3 border font-bold">{c.name}</td>
              <td className="p-3 border">{c.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clusters;
