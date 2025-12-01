import React, { useState } from "react";
import { createTeams } from "../api";

export default function TeamsView() {
  const [teams, setTeams] = useState([]);

  const handleCreateTeams = async () => {
    const population = [
      "Ali", "Sara", "Noor", "Fahad", "Hind", "Omar", "Laila", "Rami",
      "Mona", "Tariq", "Aisha", "Salem", "Noura", "Khalid", "Reem", "Ahmed"
    ];

    const data = await createTeams(population, 2);
    if (data && data.teams) {
      setTeams(data.teams);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Clusterverse MVP3 - Teams</h2>
      <button onClick={handleCreateTeams}>Generate Teams</button>

      {teams.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {teams.map((team) => (
            <div key={team.id} style={{ marginBottom: "20px" }}>
              <h3>{team.id}</h3>
              <ul>
                {team.members.map((m) => (
                  <li key={m.id}>
                    <strong>{m.name}</strong> - {m.role}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
