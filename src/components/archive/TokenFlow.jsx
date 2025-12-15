// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ TokenFlow.jsx (MVP-101.2 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œReward Live Preview FinalÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ============================================================


export default function TokenFlow() {
  const [rewards, setRewards] = useState([]);
  const [heatmap, setHeatmap] = useState({});
  const [dindex, setDindex] = useState(0);
  const [status, setStatus] = useState("connecting...");

  useEffect(() => {
    let ws;
    const connect = () => {
      const base = import.meta.env.VITE_WS_BASE || "ws://127.0.0.1:8000";
      ws = new WebSocket(`${base}/ws/synaptic`);

      ws.onopen = () => setStatus("ÃƒÂ°Ã…Â¸Ã…Â¸Ã‚Â¢ live");
      ws.onclose = () => {
        setStatus("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â´ disconnected ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ retrying...");
        setTimeout(connect, 3000);
      };
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.type === "reward_update") {
          setRewards((prev) => [msg.data, ...prev.slice(0, 9)]);
        }
        if (msg.event === "dopamine_pulse") {
          setHeatmap(msg.heatmap);
          setDindex(msg.DIndex.toFixed(3));
        }
      };
    };
    connect();
    return () => ws && ws.close();
  }, []);

  // listen for local simulation events
  useEffect(() => {
    const handleLocal = (e) => {
      setRewards((prev) => [e.detail, ...prev.slice(0, 9)]);
    };
    window.addEventListener("reward_local", handleLocal);
    return () => window.removeEventListener("reward_local", handleLocal);
  }, []);

  const tribes = Object.entries(heatmap);

  return (
    <div className="p-5 bg-gray-900 rounded-2xl shadow-xl text-white mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Token Flow & Dopamine Pulse</h2>
        <span className="text-sm text-gray-400">{status}</span>
      </div>

      {tribes.length === 0 && (
        <p className="text-gray-500 text-sm mb-3">
          Waiting for first dopamine pulse...
        </p>
      )}

      <div className="mb-4 grid grid-cols-4 gap-2 text-center">
        {tribes.map(([tribe, value]) => (
          <div key={tribe} className="bg-gray-800 p-3 rounded-xl">
            <div className="text-xs text-gray-400 mb-1">{tribe}</div>
            <div className="text-lg font-semibold text-emerald-400">
              {(value * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm mb-2">
        D-Index:{" "}
        <span
          className={`font-semibold ${
            dindex > 0.7
              ? "text-green-400"
              : dindex > 0.4
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {dindex}
        </span>
      </div>

      <table className="w-full text-sm border-t border-gray-800">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th>Tribe</th>
            <th>Eng.</th>
            <th>D-Idx</th>
            <th>ÃƒÆ’Ã¢â‚¬â€Mult</th>
            <th>C4T</th>
            <th>TribeT</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((r, i) => (
            <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/70">
              <td>{r.tribe}</td>
              <td>{r.engagement.toFixed(2)}</td>
              <td>{r.dindex.toFixed(2)}</td>
              <td>{r.multiplier.toFixed(2)}</td>
              <td>{r.C4T_tokens}</td>
              <td>{r.Tribe_tokens}</td>
              <td className="text-emerald-400 font-semibold">{r.reward_index}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


