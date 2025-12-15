import React, { useEffect, useState } from "react";

function ClusterTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/clustered-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Ã°Å¸â€œÅ  Clustered Users</h2>
      <table className="min-w-full border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User ID</th>
            <th className="border p-2">Answers</th>
            <th className="border p-2">Cluster</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td className="border p-2">{u.user_id}</td>
              <td className="border p-2">{u.answers.join(", ")}</td>
              <td className="border p-2 font-bold">{u.cluster}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClusterTable;

