import React from "react";

export default function MemberActions({ member }) {

  const handle = async (action) => {
    await fetch("/api/tribe/member-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, memberId: member.id }),
    });
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handle("approve")}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Approve
      </button>

      <button
        onClick={() => handle("flag")}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Flag
      </button>

      <button
        onClick={() => handle("kick")}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Kick
      </button>

      <button
        onClick={() => handle("promote")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Promote
      </button>
    </div>
  );
}

