import React, { useState } from "react";
import { voteForIdea } from "./teamsApi";

export default function Voting({ teamId, initialContents }) {
  const [contents, setContents] = useState(initialContents);

  const handleVote = async (id) => {
    const res = await voteForIdea(teamId, id);
    if (res) {
      setContents(
        contents.map((c) =>
          c.id === id ? { ...c, votes: res.votes } : c
        )
      );
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg mt-6">
      <h2 className="text-lg font-semibold mb-4">Ã°Å¸â€˜Â Voting for {teamId}</h2>
      <ul className="space-y-3">
        {contents.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center bg-gray-700 px-4 py-2 rounded-lg"
          >
            <span>{c.text}</span>
            <div className="flex items-center gap-3">
              <strong>{c.votes} votes</strong>
              <button
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                onClick={() => handleVote(c.id)}
              >
                Vote
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

