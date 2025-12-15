// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ TribeEconomyForecast.jsx (v163.2 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSmoothed Forecast + Confidence ScoreÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Predicts short-term direction of tribe tokenValue
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Uses smoothed momentum vs volatility ratio
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds confidence score & color-coded trend strength bar
// ============================================================

import { useCoreSync } from "@context/CoreSyncContext";
import { motion } from "framer-motion";

function computeForecast(history, tribe) {
  const recent = history.slice(-6).map((v) => v[tribe]).filter(Boolean);
  if (recent.length < 3) return { dir: "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢", delta: 0, confidence: 0 };

  const avgNow = recent.slice(-3).reduce((a, b) => a + b, 0) / 3;
  const avgPrev = recent.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
  const momentum = avgNow - avgPrev;
  const volatility = Math.max(...recent) - Math.min(...recent) || 0.0001;

  const normalized = momentum / volatility;
  const confidence = Math.min(Math.abs(normalized) * 100, 100);

  if (normalized > 0.2) return { dir: "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Ëœ", delta: normalized, confidence };
  if (normalized < -0.2) return { dir: "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Å“", delta: normalized, confidence };
  return { dir: "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢", delta: 0, confidence };
}

export default function TribeEconomyForecast() {
  const { tribes } = useCoreSync();
  const [history, setHistory] = useState([]);
  const [forecast, setForecast] = useState({});

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  capture tokenValue history snapshot
  useEffect(() => {
    if (!tribes || tribes.length === 0) return;
    const entry = Object.fromEntries(
      tribes.map((t) => [t.name, t.tokenValue ?? 1.0])
    );
    setHistory((prev) => [...prev.slice(-25), entry]); // keep 25 recent
  }, [tribes]);

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â® recompute forecast when history updates
  useEffect(() => {
    const next = {};
    tribes.forEach((t) => {
      next[t.name] = computeForecast(history, t.name);
    });
    setForecast(next);
  }, [history, tribes]);

  const colorMap = {
    "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Ëœ": "text-green-400",
    "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Å“": "text-red-400",
    "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢": "text-yellow-400",
  };

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 shadow-lg">
      <h3 className="text-pink-400 font-semibold mb-3">
        ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ Tribe Token Forecast (Next Cycle)
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        AI-predicted short-term trend and confidence (based on live volatility)
      </p>

      <table className="w-full text-sm text-gray-300">
        <thead className="border-b border-gray-700 text-gray-400 uppercase">
          <tr>
            <th className="py-1 text-left">Tribe</th>
            <th className="py-1 text-center">Current</th>
            <th className="py-1 text-center">Forecast</th>
            <th className="py-1 text-right">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {tribes.map((t, i) => {
            const f = forecast[t.name] || {};
            return (
              <motion.tr
                key={t.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-b border-gray-800 hover:bg-[#1a2233]"
              >
                <td className="py-2 font-medium">{t.name}</td>
                <td className="py-2 text-center text-purple-300">
                  {(t.tokenValue ?? 1.0).toFixed(3)}
                </td>
                <td
                  className={`py-2 text-center font-bold ${
                    colorMap[f.dir] || "text-gray-300"
                  }`}
                >
                  {f.dir}
                </td>
                <td className="py-2 text-right text-gray-400 pr-2">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-2 ${
                          f.dir === "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Ëœ"
                            ? "bg-green-500"
                            : f.dir === "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Å“"
                            ? "bg-red-500"
                            : "bg-yellow-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${f.confidence || 0}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <span className="w-10 text-right text-gray-300">
                      {f.confidence?.toFixed(0)}%
                    </span>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


