import React, { useEffect, useState } from "react";

export default function PersonaCard() {
  const [persona, setPersona] = useState(null);
  const username = "user001";

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/persona/${username}`)
      .then((res) => res.json())
      .then((data) => setPersona(data));
  }, []);

  if (!persona) return <div className="p-8 text-center">Loading persona...</div>;

  return (
    <div className="p-8 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold mb-4">ðŸ§  Persona Intelligence</h1>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-semibold">{persona.username}</h2>
        <p className="text-gray-500 mb-2">Tribe: {persona.tribe}</p>
        <p className="text-lg mb-2">Mood: {(persona.mood * 100).toFixed(1)}%</p>
        <span className="inline-block bg-indigo-600 text-white px-4 py-1 rounded-full">
          {persona.emotional_type}
        </span>
      </div>
    </div>
  );
}
