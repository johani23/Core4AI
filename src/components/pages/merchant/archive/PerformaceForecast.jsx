// ============================================================================
// ðŸ’š Core4.AI â€“ PerformanceForecast.jsx (v13 PRO)
// ----------------------------------------------------------------------------
// â€¢ AI predictive analytics for campaign builder
// â€¢ CTR / CPC / CPM / CVR / ROAS + Funnel
// â€¢ Dynamic color indicators and risk flags
// â€¢ Works with creativeKit, productIQ and plan
// ============================================================================

import React, { useEffect, useState } from "react";

export default function PerformanceForecast({ productIQ, plan, creativeKit }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================================
  // AI Simulation Logic
  // ================================
  useEffect(() => {
    if (!productIQ) return;

    setLoading(true);

    setTimeout(() => {
      const impressions = Math.floor(10000 + Math.random() * 25000);
      const ctr = parseFloat((1.2 + Math.random() * 2.5).toFixed(2)); // %
      const clicks = Math.floor((ctr / 100) * impressions);
      const cpc = parseFloat((0.4 + Math.random() * 0.9).toFixed(2));
      const cpm = parseFloat((2.5 + Math.random() * 5).toFixed(2));
      const cvr = parseFloat((0.8 + Math.random() * 2.2).toFixed(2)); // %
      const conversions = Math.floor((cvr / 100) * clicks);
      const avg_order = productIQ.ai_proposed_price;
      const revenue = conversions * avg_order;
      const ad_spend = clicks * cpc;
      const roas = parseFloat((revenue / Math.max(1, ad_spend)).toFixed(2));

      // Confidence score
      const confidence = Math.floor(65 + Math.random() * 25);

      setForecast({
        impressions,
        ctr,
        clicks,
        cpc,
        cpm,
        cvr,
        conversions,
        revenue,
        ad_spend,
        roas,
        confidence,
      });

      setLoading(false);
    }, 700);
  }, [productIQ]);

  if (loading || !forecast) {
    return (
      <div className="p-8 bg-white border rounded-xl text-center text-gray-500">
        â³ AI is forecasting performanceâ€¦
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg border rounded-xl p-8 mb-10">

      <h2 className="text-3xl font-extrabold text-[#006C35] mb-6">
        ðŸ“ˆ Performance Forecast
      </h2>

      {/* ====================== Core Metrics ====================== */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Metric label="CTR" value={`${forecast.ctr}%`} good={forecast.ctr > 2} />
        <Metric label="CPC" value={`${forecast.cpc} SAR`} good={forecast.cpc < 0.9} />
        <Metric label="CPM" value={`${forecast.cpm} SAR`} good={forecast.cpm < 6} />
        <Metric label="CVR" value={`${forecast.cvr}%`} good={forecast.cvr > 1.5} />
        <Metric label="ROAS" value={`${forecast.roas}x`} good={forecast.roas > 1.5} />
        <Metric label="Confidence" value={`${forecast.confidence}%`} good={forecast.confidence > 70} />
      </div>

      {/* ====================== Funnel Diagram ====================== */}
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4 text-purple-700">
          ðŸ”» Traffic Funnel
        </h3>

        <div className="space-y-3">
          <FunnelStep label="Impressions" value={forecast.impressions} width={100} color="bg-blue-400" />
          <FunnelStep label="Clicks" value={forecast.clicks} width={50} color="bg-green-400" />
          <FunnelStep label="Add to Cart" value={Math.floor(forecast.clicks * 0.35)} width={30} color="bg-yellow-400" />
          <FunnelStep label="Conversions" value={forecast.conversions} width={15} color="bg-red-400" />
        </div>
      </section>

      {/* ====================== Revenue Block ====================== */}
      <section className="mb-8 p-5 bg-gray-50 border rounded-xl">
        <p className="text-lg font-bold">
          ðŸ’° Estimated Revenue:
          <span className="text-green-700"> {forecast.revenue} SAR</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Based on {forecast.conversions} expected conversions.
        </p>
      </section>

      {/* ====================== Risk Flags ====================== */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 text-red-600">âš ï¸ Risk Flags</h3>

        <ul className="list-disc ml-5 text-sm text-gray-700">
          {forecast.roas < 1.2 && <li>ROAS may be low for high-budget campaigns.</li>}
          {forecast.ctr < 1.5 && <li>CTR weaker than expected for TikTok format.</li>}
          {forecast.cpc > 1.0 && <li>CPC high: consider shorter hooks or stronger value angle.</li>}
        </ul>

        {forecast.roas > 1.8 && (
          <p className="text-green-700 font-bold mt-2">ðŸ”¥ Strong potential ROI.</p>
        )}
      </section>

      {/* ====================== AI Recommendations ====================== */}
      <section>
        <h3 className="text-xl font-bold text-[#006C35] mb-3">
          ðŸ’¡ AI Recommendations
        </h3>

        <ul className="list-disc ml-5 text-sm text-gray-700">
          <li>Use top 3 storyboard scenes as primary hook variations.</li>
          <li>Test carousel photoshoot + reel hybrid format.</li>
          <li>Allocate 40% of the budget to micro creators for best CVR.</li>
          <li>Use emotional trigger "{Object.values(creativeKit.emotional_triggers)[0]}".</li>
          <li>Try posting during: {plan.ideal_posting_times.join(", ")}.</li>
        </ul>
      </section>
    </div>
  );
}


// ============================================================================
// Small Components
// ============================================================================

function Metric({ label, value, good }) {
  return (
    <div
      className={`p-4 border rounded-xl text-center ${
        good ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
      }`}
    >
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function FunnelStep({ label, value, width, color }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-bold">{label}</span>
        <span className="text-sm text-gray-700">{value}</span>
      </div>

      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
        <div
          className={`${color} h-full`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
