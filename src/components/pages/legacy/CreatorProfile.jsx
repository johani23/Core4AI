import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

export default function CreatorProfile() {
  const { name } = useParams();
  const [creator, setCreator] = useState(null);
  const [burst, setBurst] = useState(false);

  const fetchCreator = async () => {
    const res = await fetch(`${API_BASE}/creator/${name}`);
    const data = await res.json();
    setCreator(data);
  };

  useEffect(() => {
    fetchCreator();
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/memory"); // optional live channel
    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.event === "level_up" && msg.creator === name) {
        setBurst(true);
        fetchCreator();
        setTimeout(() => setBurst(false), 2000);
      }
    };
    return () => socket.close();
  }, []);

  if (!creator) return <div>Loading...</div>;

  const progress = Math.min((creator.xp % 100) / 100, 1);

  return (
    <div className="max-w-2xl mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold">{creator.name}</h1>
      <p className="text-sm text-gray-400">Tribe: {creator.tribe}</p>

      <div className="relative w-full bg-gray-800 rounded-full h-4 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="flex items-center justify-center space-x-2">
        <span className="text-sm text-gray-400">XP:</span>
        <span className="font-semibold">{Math.round(creator.xp)}</span>
        <span className="text-sm text-gray-400">| Level:</span>
        <span className="font-bold text-pink-400">{creator.level}</span>
      </div>

      {burst && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 3, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-5xl font-bold text-pink-500 drop-shadow-xl">
            LEVEL UP!
          </span>
        </motion.div>
      )}
    </div>
  );
}

