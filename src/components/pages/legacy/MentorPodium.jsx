// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MentorPodium.jsx (MVP-89 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œLive Growth Pulse ArenaÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Keeps 3-D podium view from MVP-88
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds live WebSocket connection to /ws/radar
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Real-time glow + lift animation on growth_pulse events
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Smooth particle burst feedback
// ============================================================

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles, Text3D } from "@react-three/drei";
import * as THREE from "three";

function FloatingPodium({ mentor, color, height, activePulse }) {
  const mesh = useRef();
  const glow = useRef(0);

  // gentle float + reactive pulse lift
  useFrame((_, delta) => {
    if (!mesh.current) return;
    const pulseLift = activePulse ? 0.4 : 0;
    mesh.current.position.y =
      height + Math.sin(Date.now() * 0.001 + height) * 0.1 + pulseLift;
    mesh.current.rotation.y += delta * 0.3;
    glow.current = THREE.MathUtils.lerp(glow.current, activePulse ? 1.5 : 0.4, 0.05);
    mesh.current.material.emissiveIntensity = glow.current;
  });

  return (
    <group position={mentor.position}>
      {/* podium cylinder */}
      <mesh ref={mesh}>
        <cylinderGeometry args={[0.8, 0.8, height, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* mentor name */}
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.22}
        height={0.05}
        position={[-0.6, height + 0.4, 0]}
      >
        {mentor.mentor}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </Text3D>

      {/* influence index */}
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.17}
        height={0.04}
        position={[-0.3, height + 0.15, 0]}
      >
        {mentor.InfluenceIndex?.toFixed(1) || "--"}
        <meshStandardMaterial color={"#fff"} />
      </Text3D>

      {/* particle aura */}
      <Sparkles
        count={activePulse ? 60 : 25}
        scale={1.8}
        size={activePulse ? 4 : 2.5}
        color={color}
        speed={activePulse ? 0.8 : 0.25}
        position={[0, height / 2, 0]}
      />

      {/* badge emoji */}
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.25}
        height={0.05}
        position={[-0.35, height + 0.7, 0]}
      >
        {mentor.badge === "Diamond"
          ? "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â "
          : mentor.badge === "Gold"
          ? "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Â¡"
          : mentor.badge === "Silver"
          ? "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‹â€ "
          : "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±"}
        <meshStandardMaterial color={color} />
      </Text3D>
    </group>
  );
}

export default function MentorPodium() {
  const [top, setTop] = useState([]);
  const [pulses, setPulses] = useState({});
  const wsRef = useRef(null);

  // fetch top mentors periodically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/mentor/analytics");
        const json = await res.json();
        const ranked = (json.analytics || [])
          .sort((a, b) => b.InfluenceIndex - a.InfluenceIndex)
          .slice(0, 3)
          .map((m, i) => ({ ...m, position: [i * 2 - 2, 0, 0] }));
        setTop(ranked);
      } catch (e) {
        console.warn("Podium fetch failed:", e);
      }
    };
    fetchData();
    const loop = setInterval(fetchData, 20000);
    return () => clearInterval(loop);
  }, []);

  // websocket listener for growth pulses
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/radar");
    wsRef.current = ws;
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.event === "growth_pulse") {
          const name = msg.mentor;
          setPulses((p) => ({ ...p, [name]: true }));
          setTimeout(() => setPulses((p) => ({ ...p, [name]: false })), 1500);
        }
      } catch {}
    };
    ws.onclose = () => console.log("[Podium WS] disconnected");
    return () => ws.close();
  }, []);

  const colors = {
    Diamond: "#22d3ee",
    Gold: "#facc15",
    Silver: "#d1d5db",
    Rising: "#4ade80",
  };
  const heights = [1.5, 1.0, 0.8];

  return (
    <div className="w-full h-[90vh] bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white relative">
      <Canvas camera={{ position: [0, 1.5, 5], fov: 55 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <OrbitControls enableZoom enablePan={false} />

        {top.map((m, i) => (
          <FloatingPodium
            key={m.mentor}
            mentor={m}
            color={colors[m.badge] || "#a855f7"}
            height={heights[i]}
            activePulse={pulses[m.mentor]}
          />
        ))}
      </Canvas>

      {/* UI overlay */}
      <div className="absolute top-4 left-4 bg-gray-900/70 border border-purple-400/30 p-3 rounded-2xl">
        <div className="text-purple-300 font-semibold text-lg">
          ÃƒÂ¢Ã…Â¡Ã‚Â¡ Live Mentor Arena
        </div>
        <div className="text-gray-400 text-sm">
          Podiums glow on <span className="text-purple-400">growth pulses</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-gray-400 text-xs">
        Auto-updates every 20 s ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Live WebSocket feed
      </div>
    </div>
  );
}


