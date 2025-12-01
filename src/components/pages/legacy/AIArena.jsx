// ============================================================
// ðŸ’Ž Core4.AI â€“ AIArena.jsx (MVP-94.4 â€œSynaptic Cinematic Modeâ€)
// ------------------------------------------------------------
// âœ… Builds upon MVP-94.3 Unified Synaptic Arena
// âœ… Adds 3-D Cinematic Orbit of tribes (react-three-fiber)
// âœ… Tribe radius & glow depend on dopamine value
// âœ… D-Index light pulse animates central core
// ============================================================

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

// ----------------------------
// ðŸŽ‡ Tribe node
// ----------------------------
function TribeNode({ name, color, dopamine, index, total, radius, speed }) {
  const mesh = useRef();
  const angleOffset = (index / total) * Math.PI * 2;

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const r = radius + dopamine * 2.5; // orbit radius scales with dopamine
    const x = Math.cos(t + angleOffset) * r;
    const y = Math.sin(t + angleOffset) * r * 0.6;
    const z = Math.sin(t * 0.7 + angleOffset) * r * 0.3;

    mesh.current.position.set(x, y, z);

    const pulse = 1 + Math.sin(Date.now() * 0.002 * (dopamine + 0.2)) * 0.15;
    mesh.current.scale.set(pulse, pulse, pulse);
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.1, 64, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={new THREE.Color(color).multiplyScalar(dopamine * 0.8)}
        roughness={0.25}
        metalness={0.6}
      />
    </mesh>
  );
}

// ----------------------------
// ðŸŒ Main Arena
// ----------------------------
export default function AIArena() {
  const { heatmap = {}, avgMood = 0.5 } = useCoreSync() || {};
  const [dindex, setDindex] = useState(0.5);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/synaptic");
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.event === "dopamine_pulse") {
          setDindex(data.DIndex || 0.5);
          setPulse(true);
          setTimeout(() => setPulse(false), 300);
        }
      } catch {}
    };
    return () => ws.close();
  }, []);

  const tribes = [
    { name: "Thinkers", color: "#60A5FA" },
    { name: "Humorists", color: "#FBBF24" },
    { name: "EventGoers", color: "#F87171" },
    { name: "Fashionists", color: "#C084FC" },
  ].map((t) => ({
    ...t,
    dopamine: heatmap[t.name] || 0.5,
  }));

  // central pulse color
  const coreColor = new THREE.Color().setHSL(dindex * 0.8, 0.8, 0.6);

  return (
    <div className="relative w-full h-[90vh] bg-black text-white overflow-hidden">
      <Canvas camera={{ position: [0, 0, 18], fov: 55 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={1.6} color={coreColor} />
        {/* ðŸ”® Core Pulse */}
        <mesh>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshStandardMaterial
            color={coreColor}
            emissive={coreColor}
            emissiveIntensity={pulse ? 2.2 : 0.9}
            metalness={0.8}
          />
        </mesh>

        {/* ðŸª Tribe Nodes */}
        {tribes.map((t, i) => (
          <TribeNode
            key={i}
            index={i}
            total={tribes.length}
            name={t.name}
            color={t.color}
            dopamine={t.dopamine}
            radius={5}
            speed={0.4 + t.dopamine}
          />
        ))}

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* D-Index Overlay */}
      <motion.div
        animate={{
          width: `${dindex * 100}%`,
          backgroundColor: pulse
            ? "rgb(244,114,182)"
            : "rgba(244,114,182,0.4)",
        }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-5 left-5 h-2 rounded-full w-1/3 shadow-[0_0_20px_2px_rgba(244,114,182,0.5)]"
      />
      <div className="absolute bottom-2 left-5 text-xs text-gray-400">
        D-Index {(dindex * 100).toFixed(1)} â€¢ Mood {(avgMood * 100).toFixed(0)} %
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 right-4 text-xs text-gray-500">
        Beta Core v9.44 â€¢ Synaptic Cinematic Mode
      </div>
    </div>
  );
}
