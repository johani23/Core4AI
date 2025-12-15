import React, { useEffect, useState } from "react";
import { getSegments, voteForIdea } from "./teamsApi";

export default function SegmentsView() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getSegments();
      if (data && data.contents) setContents(data.contents);
    }
    fetchData();
  }, []);

  const handleVote = async (id) => {
    // Ù†Ø³ØªØ®Ø¯Ù… "segments" ÙƒÙ€ team_id Ù…Ø¨Ø¯Ø¦ÙŠØ§Ù‹
    const res = await voteForIdea("segments", id);
    if (res) {
      setContents(
        contents.map((c) =>
          c.id === id ? { ...c, votes: res.votes } : c
        )
      );
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-bold mb-4">ðŸ“¢ Segment Submissions</h2>
      <ul className="space-y-3">
        {contents.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center bg-gray-700 px-4 py-2 rounded-lg"
          >
            <span>
              <strong>{c.segment}:</strong> {c.text}
            </span>
            <div className="flex items-center gap-3">
              <strong>{c.votes} votes</strong>
              <button
                onClick={() => handleVote(c.id)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
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
