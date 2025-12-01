import React, { useState } from "react";
import { createTeams } from "./teamsApi";
import Voting from "./Voting";

export default function Teams() {
  const [teams, setTeams] = useState([]);

  const handleGenerateTeams = async () => {
    const population = [
      "Noor",
      "Reem",
      "Rami",
      "Laila",
      "Mona",
      "Aisha",
      "Noura",
      "Salem",
      "Sara",
      "Hind",
      "Fahad",
      "Khalid",
      "Omar",
      "Ali",
      "Tariq",
      "Ahmed",
    ];
    const res = await createTeams(population, 2);
    if (res && res.teams) setTeams(res.teams);
  };

  const handleReset = () => setTeams([]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">👥 Teams & Voting</h2>

      <div className="flex gap-3 mb-4">
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          onClick={handleGenerateTeams}
        >
          Generate Teams
        </button>
        <button
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {teams.length === 0 && (
        <p className="text-gray-400">Click "Generate Teams" to start.</p>
      )}

      {teams.map((team) => (
        <div key={team.id} className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            {team.id} ({team.members.length} members)
          </h3>
          <ul className="list-disc ml-6 mb-4">
            {team.members.map((m) => (
              <li key={m.id}>
                <strong>{m.name}</strong> — {m.role}
              </li>
            ))}
          </ul>

          <Voting
            teamId={team.id}
            initialContents={[
              { id: 1, text: "Best team idea 💡", votes: 0 },
              { id: 2, text: "Strongest contribution 💪", votes: 0 },
              { id: 3, text: "Funniest moment 😂", votes: 0 },
            ]}
          />
        </div>
      ))}
    </div>
  );
}
