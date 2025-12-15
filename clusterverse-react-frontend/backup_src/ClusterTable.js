import React from "react";

export default function ClusterTable() {
  const clusters = [
    { id: 1, name: "Singles Cluster", members: 25 },
    { id: 2, name: "Engaged Cluster", members: 18 },
    { id: 3, name: "Married Cluster", members: 30 }
  ];

  return (
    <div className="card">
      <h2>ðŸ“Š Clusters Overview</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Members</th></tr>
        </thead>
        <tbody>
          {clusters.map((c) => (
            <tr key={c.id}><td>{c.name}</td><td>{c.members}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
