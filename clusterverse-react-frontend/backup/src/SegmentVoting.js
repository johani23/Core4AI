import React, { useEffect, useState } from "react";
import { getSegments, voteForSegment } from "./segments";

export default function SegmentVoting() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getSegments();
      if (data && data.contents) {
        setContents(data.contents);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleVote = async (id) => {
    const res = await voteForSegment(id);
    if (res) {
      setContents(
        contents.map((c) =>
          c.id === id ? { ...c, votes: res.votes } : c
        )
      );
    }
  };

  if (loading) return <p className="text-gray-400">â³ Loading segments...</p>;

  const grouped = contents.reduce((acc, item) => {
    if (!acc[item.segment]) acc[item.segment] = [];
    acc[item.segment].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">ðŸŒ Segments Voting</h2>

      {Object.keys(grouped).map((segment) => (
        <div key={segment} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 capitalize">
            {segment === "fashion" && "ðŸ‘— Fashion"}
            {segment === "humor" && "ðŸ˜‚ Humor"}
            {segment === "thinkers" && "ðŸ¤” Thinkers"}
            {segment === "event-goers" && "ðŸŽ‰ Event-goers"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grouped[segment].map((c) => (
              <div
                key={c.id}
                className={`bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between
                  ${c.segment === "fashion" ? "segment-fashion" : ""}
                  ${c.segment === "humor" ? "segment-humor" : ""}
                  ${c.segment === "thinkers" ? "segment-thinkers" : ""}
                  ${c.segment === "event-goers" ? "segment-event-goers" : ""}`}
              >
                <p className="mb-2">{c.text}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {c.votes} votes
                  </span>
                  <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                    onClick={() => handleVote(c.id)}
                  >
                    Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
