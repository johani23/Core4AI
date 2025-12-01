import React, { useState, useEffect } from "react";
import { getClusters, getClusterShadow } from "../services/api";

function Clusters() {
  const [clusters, setClusters] = useState([]);
  const [shadow, setShadow] = useState(null);

  useEffect(() => {
    loadClusters();
  }, []);

  async function loadClusters() {
    const data = await getClusters();
    setClusters(data);
  }

  async function loadShadow(name) {
    const data = await getClusterShadow(name);
    setShadow(data);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">ðŸŒ Clusters</h2>
      <ul>
        {clusters.map((cl) => (
          <li
            key={cl.name}
            className="border p-2 mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() => loadShadow(cl.name)}
          >
            {cl.name} ({cl.members} members)
          </li>
        ))}
      </ul>

      {shadow && (
        <div className="mt-4 p-4 border bg-gray-50">
          <h3 className="font-bold">Cluster Shadow</h3>
          <p>{shadow.shadow}</p>
        </div>
      )}
    </div>
  );
}

export default Clusters;
