/**
 * Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MVP 19.6
 * ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¦ Emotional Weather Component
 * 
 * Displays the systemÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢s current ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œemotional climateÃƒÂ¢Ã¢â€šÂ¬Ã‚Â derived from the
 * Dopamine Intelligence Engine. Designed for Dashboard integration.
 * 
 * - Pulls live data from /dopamine/weather
 * - Falls back to simulated mood if offline
 * - Uses Framer Motion for smooth UI transitions
 */

import { motion } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

export default function EmotionalWeather() {
  const [weather, setWeather] = useState(null);

  /* -------------------- Fetch Emotional Weather -------------------- */
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/dopamine/weather`);
        const data = await res.json();
        setWeather(data);
      } catch {
        // fallback: random simulated sentiment
        const moods = [
          {
            condition: "ÃƒÂ¢Ã…Â¡Ã‚Â¡ High creative euphoria",
            forecast_message: "Collective inspiration wave incoming.",
            emotional_risk: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Overstimulation possible",
            trend: "rising",
          },
          {
            condition: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ Positive, inspired",
            forecast_message: "Momentum steady ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â balanced emotional energy.",
            emotional_risk: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Stable state",
            trend: "stable",
          },
          {
            condition: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â« Moderate mood",
            forecast_message: "Clusters are neutral, awaiting new spark.",
            emotional_risk: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¤ Slight under-stimulation",
            trend: "stable",
          },
          {
            condition: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â§ Low creative energy",
            forecast_message: "Creative energy declining slightly.",
            emotional_risk: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¤ Under-stimulation risk",
            trend: "falling",
          },
        ];
        setWeather(moods[Math.floor(Math.random() * moods.length)]);
      }
    }

    load();
    const interval = setInterval(load, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  if (!weather) {
    return (
      <div className="text-gray-500 text-sm text-center mt-8 animate-pulse">
        Loading emotional weather...
      </div>
    );
  }

  /* -------------------- UI Presentation -------------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-yellow-400 mb-2">
        ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¦ Emotional Weather
      </h2>

      <div className="text-3xl mb-1">{weather.condition}</div>

      <p className="text-gray-400 text-sm mb-2 italic">
        {weather.forecast_message}
      </p>

      <div className="text-sm">
        <span
          className={`font-semibold ${
            weather.trend === "rising"
              ? "text-green-400"
              : weather.trend === "falling"
              ? "text-red-400"
              : "text-blue-400"
          }`}
        >
          {weather.trend === "rising"
            ? "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Ëœ Rising mood"
            : weather.trend === "falling"
            ? "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Å“ Declining mood"
            : "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Stable mood"}
        </span>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        {weather.emotional_risk}
      </p>

      <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-yellow-400"
          initial={{ width: "0%" }}
          animate={{
            width:
              weather.trend === "rising"
                ? "85%"
                : weather.trend === "falling"
                ? "40%"
                : "65%",
          }}
          transition={{ duration: 1.2 }}
        />
      </div>
    </motion.div>
  );
}


