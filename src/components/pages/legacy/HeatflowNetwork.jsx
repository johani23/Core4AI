// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ HeatflowNetwork.jsx (MVP-46 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œLive Neural Pulse EditionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Auto-Replay with sentiment-based progress bar
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Cinematic glow + live swarm mood animation
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Fully synchronized HUD + dynamic color transitions
// ============================================================

import ForceGraph2D from "react-force-graph-2d";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function HeatflowNetwork() {
  const graphRef = useRef();
  const wsRef = useRef(null);
  const replayTimer = useRef(null);

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [connected, setConnected] = useState(false);
  const [time, setTime] = useState(0);
  const [hud, setHud] = useState({ avgSentiment: 0, totalHeat: 0, tribes: 0 });
  const [memory, setMemory] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const [replay, setReplay] = useState(null);
  const [autoReplay, setAutoReplay] = useState(false);
  const [replayIndex, setReplayIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Sentiment-based color helper
  const getMoodColor = (s) => {
    if (s > 0.25) return "#22c55e"; // green
    if (s < -0.25) return "#ef4444"; // red
    return "#eab308"; // yellow
  };

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¢Ã¢â‚¬â„¢ animate time for breathing effects
  useEffect(() => {
    let frame;
    const tick = (t) => {
      setTime(t / 1000);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â WebSocket ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ disabled during replay
  useEffect(() => {
    if (replay || autoReplay) return;
    let ws;
    const connect = () => {
      ws = new WebSocket("ws://127.0.0.1:8000/ws/heatflow");
      wsRef.current = ws;
      ws.onopen = () => setConnected(true);
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.type === "update_heat") {
          const tribes = msg.tribes || [];
          const flows = msg.flows || [];

          const avgSentiment =
            tribes.reduce((a, b) => a + b.sentiment, 0) / (tribes.length || 1);
          const totalHeat = tribes.reduce((a, b) => a + b.heat, 0);
          setHud({ avgSentiment, totalHeat, tribes: tribes.length });

          const snapshot = {
            t: Date.now(),
            s: avgSentiment,
            h: totalHeat,
            tribes,
            flows,
          };
          setSnapshots((p) => [...p, snapshot].slice(-30));
          setMemory((p) =>
            [...p, { t: snapshot.t, s: snapshot.s, h: snapshot.h }].slice(-30)
          );

          setGraphData({
            nodes: tribes.map((t) => ({
              id: t.name,
              val: Math.abs(t.sentiment) * 12 + 5,
              heat: t.heat,
              sentiment: t.sentiment,
              color: getMoodColor(t.sentiment),
            })),
            links: flows.map((f) => ({
              source: f.source,
              target: f.target,
              value: Math.abs(f.influence),
              influence: f.influence,
            })),
          });
        }
      };
      ws.onclose = () => {
        setConnected(false);
        setTimeout(connect, 3000);
      };
    };
    connect();
    return () => ws && ws.close();
  }, [replay, autoReplay]);

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Handle manual snapshot replay
  const handleReplay = (index) => {
    const s = snapshots[index];
    if (!s) return;
    if (wsRef.current) wsRef.current.close();
    setConnected(false);
    setReplay(s);
    setGraphData({
      nodes: s.tribes.map((t) => ({
        id: t.name,
        val: Math.abs(t.sentiment) * 12 + 5,
        heat: t.heat,
        sentiment: t.sentiment,
        color: getMoodColor(t.sentiment),
      })),
      links: s.flows.map((f) => ({
        source: f.source,
        target: f.target,
        value: Math.abs(f.influence),
        influence: f.influence,
      })),
    });
    setHud({ avgSentiment: s.s, totalHeat: s.h, tribes: s.tribes.length });
  };

  // ÃƒÂ°Ã…Â¸Ã…Â½Ã…Â¾ Auto-Replay Mode
  const startAutoReplay = () => {
    if (snapshots.length === 0) return;
    if (wsRef.current) wsRef.current.close();
    setConnected(false);
    setAutoReplay(true);
    setProgress(0);
    let i = 0;
    replayTimer.current = setInterval(() => {
      if (i >= snapshots.length) {
        clearInterval(replayTimer.current);
        setAutoReplay(false);
        setTimeout(() => setReplay(null), 1000);
        return;
      }
      handleReplay(i);
      setReplayIndex(i);
      setProgress(((i + 1) / snapshots.length) * 100);
      i++;
    }, 1000);
  };

  const stopAutoReplay = () => {
    clearInterval(replayTimer.current);
    setAutoReplay(false);
    setReplay(null);
    setProgress(0);
  };

  useEffect(() => () => clearInterval(replayTimer.current), []);

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  Timeline Chart
  const chartData = {
    labels: memory.map((m) =>
      new Date(m.t).toLocaleTimeString("en-US", {
        minute: "2-digit",
        second: "2-digit",
      })
    ),
    datasets: [
      {
        label: "Avg Sentiment",
        data: memory.map((m) => m.s),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Total Heat",
        data: memory.map((m) => m.h),
        borderColor: "#a855f7",
        backgroundColor: "rgba(168,85,247,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    onClick: (evt, el) => {
      if (el.length > 0) handleReplay(el[0].index);
    },
    plugins: { legend: { labels: { color: "#ccc" } } },
    scales: {
      x: { ticks: { color: "#888" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "#888" }, grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬ Node + Link rendering
  const drawLink = (l, ctx) => {
    if (!l.source?.x || !l.target?.x) return;
    const glow = (Math.sin(time * 3 + l.value * 10) + 1) / 2;
    const alpha = 0.4 + 0.4 * glow;
    const color =
      l.influence > 0 ? `rgba(0,255,170,${alpha})` : `rgba(255,60,90,${alpha})`;
    const grad = ctx.createLinearGradient(l.source.x, l.source.y, l.target.x, l.target.y);
    grad.addColorStop(0, color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.beginPath();
    ctx.moveTo(l.source.x, l.source.y);
    ctx.lineTo(l.target.x, l.target.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = Math.max(1, l.value * 3);
    ctx.shadowBlur = 15 * glow;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const drawNode = (n, ctx) => {
    if (!n?.x) return;
    const pulse = 0.5 + 0.5 * Math.sin(time * 2 + n.heat * 6);
    const r = 4 + n.val / 6;
    const halo = r * (1.8 + pulse * 0.6);
    const grad = ctx.createRadialGradient(n.x, n.y, r, n.x, n.y, halo);
    grad.addColorStop(0, `${n.color}33`);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(n.x, n.y, halo, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = n.color;
    ctx.fill();
  };

  // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Progress bar color = sentiment heat blend
  const barColor = getMoodColor(hud.avgSentiment);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Pulsing background */}
      <div
        className="absolute inset-0 blur-3xl opacity-25 animate-pulse"
        style={{
          background: `radial-gradient(circle at center, ${barColor}55 0%, transparent 70%)`,
        }}
      />

      {/* Overlay */}
      {(replay || autoReplay) && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-purple-900/70 border border-purple-500/30 px-6 py-2 rounded-xl text-sm shadow-lg z-50 backdrop-blur-md flex items-center gap-3">
          {autoReplay ? (
            <span>ÃƒÂ°Ã…Â¸Ã…Â½Ã…Â¾ Auto-Replay {replayIndex + 1}/{snapshots.length}</span>
          ) : (
            <span>ÃƒÂ¢Ã‚ÂÃ‚Â± Snapshot ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ {new Date(replay.t).toLocaleTimeString()}</span>
          )}
          {!autoReplay ? (
            <button
              onClick={startAutoReplay}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-3 py-1 text-xs font-medium"
            >
              ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â¶ Auto
            </button>
          ) : (
            <button
              onClick={stopAutoReplay}
              className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1 text-xs font-medium"
            >
              ÃƒÂ¢Ã‚ÂÃ‚Â¹ Stop
            </button>
          )}
        </div>
      )}

      {/* HUD */}
      <div className="absolute top-4 right-4 bg-black/40 border border-gray-700/50 rounded-2xl px-5 py-3 backdrop-blur-md shadow-lg text-sm flex flex-col gap-1 z-40">
        <div className="flex justify-between">
          <span className="text-gray-400">ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Sentiment</span>
          <span style={{ color: barColor }} className="font-semibold">
            {hud.avgSentiment.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">ÃƒÂ¢Ã…Â¡Ã‚Â¡ Heat</span>
          <span className="text-purple-400 font-semibold">
            {hud.totalHeat.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Tribes</span>
          <span className="text-blue-400 font-semibold">{hud.tribes}</span>
        </div>
        <div className="mt-1 text-xs text-gray-500 text-right">
          {connected
            ? "ÃƒÂ°Ã…Â¸Ã…Â¸Ã‚Â¢ Live"
            : autoReplay
            ? "ÃƒÂ°Ã…Â¸Ã…Â½Ã…Â¾ Auto Replay"
            : replay
            ? "ÃƒÂ¢Ã‚ÂÃ‚Â± Snapshot"
            : "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â´ Disconnected"}
        </div>
      </div>

      {/* Graph */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto pt-8"
      >
        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
          Tribe Influence Network
        </h1>

        <div className="rounded-2xl border border-gray-800 bg-black/40 shadow-2xl h-[550px]">
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeRelSize={6}
            backgroundColor="#000"
            autoPauseRedraw={false}
            enableNodeDrag={false}
            nodeCanvasObject={drawNode}
            linkCanvasObject={drawLink}
          />
        </div>

        {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Timeline with Sentiment Progress */}
        <div className="mt-10 p-4 rounded-2xl bg-black/40 border border-gray-800 shadow-lg relative">
          <h2 className="text-center text-gray-300 text-sm mb-2">
            ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Swarm Memory Timeline
          </h2>
          <Line data={chartData} options={chartOptions} height={80} />
          {autoReplay && (
            <div className="absolute bottom-0 left-0 h-1.5 rounded-b-xl overflow-hidden w-full">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${barColor}, #a855f7)`,
                  boxShadow: `0 0 20px ${barColor}`,
                }}
              ></div>
            </div>
          )}
        </div>

        <div className="text-center mt-8 pb-10">
          <a
            href="/dashboard"
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition"
          >
            ÃƒÂ¢Ã¢â‚¬Â Ã‚Â Back to Dashboard
          </a>
        </div>
      </motion.div>
    </div>
  );
}


