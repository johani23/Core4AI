// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ TribeEconomyDashboard.jsx (v1.4 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œCrash-Proof Live DeltaÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Fixes .toFixed() crashes on undefined/null
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Preserves live deltas + top tribe
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Render-safe during WS reconnects or partial updates
// ============================================================

import { useCoreSync } from "@context/CoreSyncContext";

export default function TribeEconomyDashboard() {
  const { tribes = [], council = {} } = useCoreSync();
  const [deltas, setDeltas] = useState({});
  const prevValues = useRef({});

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Compute deltas on update
  useEffect(() => {
    if (!Array.isArray(tribes)) return;
    const newDeltas = {};
    tribes.forEach((t) => {
      const safeDop = Number.isFinite(t?.dopamine) ? t.dopamine : 0;
      const safeTok = Number.isFinite(t?.tokenValue) ? t.tokenValue : 1;

      const prev = prevValues.current[t?.name] || {};
      const dDop = safeDop - (Number.isFinite(prev.dopamine) ? prev.dopamine : safeDop);
      const dTok = safeTok - (Number.isFinite(prev.tokenValue) ? prev.tokenValue : safeTok);

      newDeltas[t?.name] = { dopamine: dDop, tokenValue: dTok };
      prevValues.current[t?.name] = { dopamine: safeDop, tokenValue: safeTok };
    });
    setDeltas(newDeltas);
  }, [tribes]);

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â Identify top tribe safely
  const topTribe =
    tribes && tribes.length
      ? tribes.reduce((a, b) => {
          const aTok = Number.isFinite(a?.tokenValue) ? a.tokenValue : 0;
          const bTok = Number.isFinite(b?.tokenValue) ? b.tokenValue : 0;
          return aTok > bTok ? a : b;
        })
      : null;

  return (
    <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 mt-10 shadow-lg">
      {/* ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â  Top Tribe Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
        <h3 className="text-purple-400 font-semibold text-lg flex items-center gap-2">
          ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â Live Tribe Economy Dashboard
        </h3>
        <div className="text-sm text-yellow-300 font-semibold bg-yellow-300/10 px-3 py-1 rounded-full">
          ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â  Top Tribe:{" "}
          {topTribe?.name ?? "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â"} (
          {Number.isFinite(topTribe?.tokenValue)
            ? topTribe.tokenValue.toFixed(2)
            : "1.00"}
          x)
        </div>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â® Tribes Snapshot */}
      <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-300">
        {Array.isArray(tribes) && tribes.length > 0 ? (
          tribes.map((t) => {
            const safeDop = Number.isFinite(t?.dopamine) ? t.dopamine : 0;
            const safeTok = Number.isFinite(t?.tokenValue) ? t.tokenValue : 1;
            const safeInf = Number.isFinite(t?.influence) ? t.influence : 0;

            const deltaDop = deltas[t?.name]?.dopamine ?? 0;
            const deltaTok = deltas[t?.name]?.tokenValue ?? 0;

            const dopTrend =
              deltaDop > 0 ? "text-green-400" : deltaDop < 0 ? "text-red-400" : "text-gray-500";
            const tokTrend =
              deltaTok > 0 ? "text-green-400" : deltaTok < 0 ? "text-red-400" : "text-gray-500";

            return (
              <div
                key={t?.name ?? Math.random()}
                className="bg-gray-800/60 rounded-xl p-4 flex flex-col items-center justify-center border border-gray-700 hover:border-purple-500 transition"
              >
                <div className="text-white font-bold mb-1">{t?.name ?? "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â"}</div>

                <div className="flex gap-1 items-center">
                  <span>Dopamine:</span>
                  <span className="text-white font-semibold">
                    {(safeDop * 100).toFixed(1)}%
                  </span>
                  <span className={`text-xs ml-1 ${dopTrend}`}>
                    {deltaDop > 0
                      ? `ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Âº${(deltaDop * 100).toFixed(1)}%`
                      : deltaDop < 0
                      ? `ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â»${Math.abs(deltaDop * 100).toFixed(1)}%`
                      : "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â"}
                  </span>
                </div>

                <div className="flex gap-1 items-center">
                  <span>Token:</span>
                  <span className="text-white font-semibold">
                    {safeTok.toFixed(2)}x
                  </span>
                  <span className={`text-xs ml-1 ${tokTrend}`}>
                    {deltaTok > 0
                      ? `ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Âº${deltaTok.toFixed(2)}`
                      : deltaTok < 0
                      ? `ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â»${Math.abs(deltaTok).toFixed(2)}`
                      : "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â"}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Influence: {(safeInf * 100).toFixed(0)} pts
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-gray-500 text-center py-6">
            No tribe data available.
          </div>
        )}
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Global D-Index */}
      <div className="mt-6 text-center text-sm text-gray-400">
        Global D-Index:{" "}
        <span className="text-yellow-400 font-bold">
          {Number.isFinite(council?.dindex)
            ? council.dindex.toFixed(1)
            : "50.0"}
        </span>
      </div>
    </div>
  );
}


