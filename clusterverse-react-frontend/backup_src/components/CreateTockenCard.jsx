import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CreatorTokenCard({ creator }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-4 rounded-2xl shadow-md bg-white/70 backdrop-blur">
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">@{creator.username}</h3>
            <span className="text-sm text-gray-500">{creator.token_symbol}</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-500">Token Value</p>
              <p className="text-xl font-bold">
                {creator.token_value.toFixed(2)} C4T
              </p>
            </div>
            <div>
              <p className={`text-sm font-semibold ${creator.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {creator.change >= 0 ? "+" : ""}
                {creator.change.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-400">Last Post Impact</p>
            <div className="text-sm">{creator.last_impact > 0 ? "📈" : "📉"} {(creator.last_impact * 100).toFixed(2)}%</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
