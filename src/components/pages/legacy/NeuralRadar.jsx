// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ NeuralRadar.jsx (MVP-39.2 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œPrediction RadarÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â® Circular radar showing trend probabilities & confidence
// ============================================================

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function NeuralRadar({ echo, nova, marketTrend }) {
  const data = [
    {
      name: "Echo",
      value: echo,
      fill: "#6366F1", // indigo
    },
    {
      name: "Nova",
      value: nova,
      fill: "#F43F5E", // rose
    },
  ];

  const trendColor =
    marketTrend === "up"
      ? "text-green-400"
      : marketTrend === "down"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 mt-10 w-11/12 md:w-[700px] mx-auto shadow-2xl"
    >
      <h3 className="text-xl font-semibold text-purple-300 text-center mb-4">
        ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Neural Prediction Radar
      </h3>

      <div className="h-[280px]">
        <ResponsiveContainer>
          <RadialBarChart
            innerRadius="30%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mt-4">
        <p className={`font-semibold ${trendColor}`}>
          Market Trend: {marketTrend ? marketTrend.toUpperCase() : "Neutral"}
        </p>
        <p className="text-sm text-gray-400">
          Echo Confidence: {echo.toFixed(1)}% | Nova Confidence:{" "}
          {nova.toFixed(1)}%
        </p>
      </div>
    </motion.div>
  );
}


