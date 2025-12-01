// ============================================================
// ðŸ’Ž Core4.AI â€“ SwarmPulseCard.jsx (MVP-41 Reactive Signal Edition)
// ------------------------------------------------------------
// âœ… Adds audio + visual pulse when |Mood Corr.| â‰¥ 0.8
// âœ… Smart 3-second glow and subtle ping
// ============================================================

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function SwarmPulseCard() {
  const [pulse, setPulse] = useState(null);
  const [connected, setConnected] = useState(false);
  const [sentimentConnected, setSentimentConnected] = useState(false);
  const [sentimentData, setSentimentData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [correlation, setCorrelation] = useState(null);
  const [alertActive, setAlertActive] = useState(false);
  const audioRef = useRef(null);
  const MAX_POINTS = 40;

  // ðŸ§  Swarm Socket
  useEffect(() => {
    let ws;
    const connect = () => {
      ws = new WebSocket(`ws://${window.location.hostname}:8000/ws/global`);
      ws.onopen = () => setConnected(true);
      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.type === "global_update") {
            setPulse(msg);
            setTrendData((prev) => {
              const t = msg.trend === "up" ? 1 : msg.trend === "down" ? -1 : 0;
              return [...prev, t].slice(-MAX_POINTS);
            });
          }
        } catch (err) {
          console.error("Swarm parse error:", err);
        }
      };
      ws.onclose = () => {
        setConnected(false);
        setTimeout(connect, 2000);
      };
    };
    connect();
    return () => ws && ws.close();
  }, []);

  // ðŸ”¥ Heatflow Socket
  useEffect(() => {
    let ws;
    const connect = () => {
      ws = new WebSocket(`ws://${window.location.hostname}:8000/ws/heatflow`);
      ws.onopen = () => setSentimentConnected(true);
      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.type === "heat_update" && typeof msg.sentiment === "number") {
            setSentimentData((p) => [...p, msg.sentiment].slice(-MAX_POINTS));
          }
        } catch (err) {
          console.error("Heatflow parse error:", err);
        }
      };
      ws.onclose = () => {
        setSentimentConnected(false);
        setTimeout(connect, 2000);
      };
    };
    connect();
    return () => ws && ws.close();
  }, []);

  // ðŸ§® Correlation
  useEffect(() => {
    if (sentimentData.length > 10 && trendData.length > 10) {
      const n = Math.min(sentimentData.length, trendData.length);
      const s = sentimentData.slice(-n);
      const t = trendData.slice(-n);
      const corr = pearsonCorrelation(s, t);
      setCorrelation(corr);

      // Trigger pulse alert if strong correlation
      if (Math.abs(corr) >= 0.8) {
        setAlertActive(true);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
        setTimeout(() => setAlertActive(false), 3000);
      }
    }
  }, [sentimentData, trendData]);

  const pearsonCorrelation = (x, y) => {
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    const num = x.map((xi, i) => (xi - meanX) * (y[i] - meanY)).reduce((a, b) => a + b, 0);
    const den = Math.sqrt(
      x.map((xi) => Math.pow(xi - meanX, 2)).reduce((a, b) => a + b, 0) *
        y.map((yi) => Math.pow(yi - meanY, 2)).reduce((a, b) => a + b, 0)
    );
    return den === 0 ? 0 : num / den;
  };

  const trend = pulse?.trend || "neutral";
  const bg =
    trend === "up"
      ? "from-green-500/30 to-emerald-900/30"
      : trend === "down"
      ? "from-red-500/30 to-rose-900/30"
      : "from-gray-500/20 to-slate-800/20";

  const chartData = {
    labels: sentimentData.map((_, i) => i + 1),
    datasets: [
      {
        data: sentimentData,
        borderColor: "#facc15",
        backgroundColor: "rgba(250,204,21,0.15)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    scales: { x: { display: false }, y: { display: false, min: -1, max: 1 } },
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
  };

  const corrColor =
    correlation > 0.5
      ? "text-green-400"
      : correlation < -0.5
      ? "text-red-400"
      : "text-yellow-300";

  return (
    <motion.div
      className={`relative w-full bg-gradient-to-br ${bg} border border-white/10 rounded-2xl p-6 mb-6 ${
        alertActive ? "ring-4 ring-yellow-400/40" : ""
      }`}
      animate={{ scale: connected ? 1.01 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ðŸ”Š Ping Sound */}
      <audio ref={audioRef} src="/sounds/ping.mp3" preload="auto" />

      {/* âš ï¸ Alert */}
      {alertActive && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`absolute -top-3 right-3 px-3 py-1 text-xs rounded-full font-semibold shadow-lg ${
            correlation > 0
              ? "bg-green-500/30 text-green-200 border border-green-400/30"
              : "bg-red-500/30 text-red-200 border border-red-400/30"
          }`}
        >
          âš ï¸ Pulse Insight â€“ High Predictive Confidence
        </motion.div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-white">âš¡ Core4 Market Radar</h2>
        <div className="flex gap-2">
          <StatusBadge label="Swarm" active={connected} />
          <StatusBadge label="Heatflow" active={sentimentConnected} />
        </div>
      </div>

      {pulse ? (
        <>
          <div className="grid grid-cols-5 gap-4 text-center mb-4">
            <Metric title="Trend" value={pulse.trend} />
            <Metric title="Energy" value={`${pulse.energy.toFixed(1)}%`} />
            <Metric title="Wisdom" value={pulse.wisdom_index.toFixed(2)} />
            <Metric title="Tribe Î”" value={pulse.tribe_delta.toFixed(1)} />
            <Metric
              title="Mood Corr."
              value={correlation ? correlation.toFixed(2) : "â€“"}
              color={corrColor}
            />
          </div>

          <div className="h-16">
            <Line data={chartData} options={chartOptions} />
          </div>

          <p className="text-xs opacity-60 text-center mt-3">
            Heatflow Sentiment (last {sentimentData.length} pulses)
          </p>
        </>
      ) : (
        <p className="text-sm opacity-70 text-center mt-2">
          Waiting for swarm signalâ€¦
        </p>
      )}
    </motion.div>
  );
}

function Metric({ title, value, color }) {
  return (
    <div className="flex flex-col bg-white/5 rounded-lg py-3">
      <span className="text-xs opacity-70 mb-1">{title}</span>
      <span className={`text-lg font-bold ${color || "text-white"}`}>{value}</span>
    </div>
  );
}

function StatusBadge({ label, active }) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${
        active
          ? "bg-green-500/20 text-green-300 border border-green-400/30"
          : "bg-red-500/20 text-red-300 border border-red-400/30"
      }`}
    >
      {label} {active ? "â—" : "â—‹"}
    </span>
  );
}
