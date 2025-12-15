// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Navbar.jsx (v125.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œUnified Navigation SourceÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Imports tab list dynamically from AppTabs.js
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Pulse ring indicator with disconnect alert
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Smooth color transitions for D-Index bar
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Sparkline limited to 30 frames (auto-updating)
// ============================================================

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";
import { appTabs } from "@config/AppTabs"; // ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ shared source of truth

export default function Navbar() {
  const location = useLocation();
  const { council = {}, backendConnected = false } = useCoreSync();
  const [history, setHistory] = useState([]);
  const svgRef = useRef(null);

  const dIndex = council.dindex || 50;

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Keep last 30 readings only
  useEffect(() => {
    setHistory((prev) => [...prev.slice(-29), dIndex]);
  }, [dIndex]);

  const sparkPath = () => {
    if (history.length < 2) return "";
    const w = svgRef.current?.clientWidth || 60;
    const h = 20;
    const max = Math.max(...history);
    const min = Math.min(...history);
    const sx = w / (history.length - 1);
    const sy = h / (max - min || 1);
    return history
      .map((v, i) => `${i === 0 ? "M" : "L"}${i * sx},${h - (v - min) * sy}`)
      .join(" ");
  };

  // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Color mappings
  const dColor =
    dIndex > 70 ? "text-green-400" : dIndex > 50 ? "text-yellow-400" : "text-red-400";
  const barColor =
    dIndex > 70
      ? "from-green-500 via-emerald-400 to-teal-300"
      : dIndex > 50
      ? "from-yellow-400 via-amber-400 to-orange-300"
      : "from-red-500 via-pink-500 to-fuchsia-500";

  return (
    <nav className="relative z-30 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-3 px-6 pt-[24px] relative">
        {/* Logo + Status */}
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-fuchsia-400 text-lg">
            Core4.AI
          </Link>

          {/* Connection Status */}
          <div className="relative flex flex-col">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {backendConnected ? (
                <>
                  <span className="text-green-400 font-medium">Live</span>
                  <div className="relative">
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-red-400 font-medium">Offline</span>
                  <span className="inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </>
              )}
            </div>
            {!backendConnected && (
              <div className="text-[10px] text-red-400 absolute -bottom-3 left-0 animate-pulse">
                connection lost
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs (pulled from shared config) */}
        <div className="flex items-center gap-6 text-sm">
          {appTabs.map(({ label, path, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1 transition-all ${
                location.pathname === path
                  ? "text-fuchsia-400 font-semibold border-b-2 border-fuchsia-400 pb-0.5"
                  : "hover:text-fuchsia-300"
              }`}
            >
              <motion.span
                whileHover={{ scale: 1.15 }}
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {icon}
              </motion.span>
              {label}
            </Link>
          ))}
        </div>

        {/* D-Index Sparkline */}
        <div className="flex items-center gap-4 relative">
          <div className="relative flex items-center gap-2">
            <div className={`text-xs font-medium ${dColor}`}>
              D-Index ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {dIndex.toFixed(1)}
            </div>
            <svg ref={svgRef} width="60" height="20" className="opacity-80">
              <path
                d={sparkPath()}
                fill="none"
                stroke={dIndex >= 70 ? "#34d399" : dIndex > 50 ? "#facc15" : "#f87171"}
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Animated Gradient Bar */}
      <div className="w-full h-1 relative overflow-hidden bg-gray-800">
        <motion.div
          animate={{ width: `${dIndex}%` }}
          transition={{ duration: 0.6 }}
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${barColor} 
            transition-all duration-700 ${dIndex >= 75 ? "animate-pulse" : ""}`}
        />
      </div>
    </nav>
  );
}


