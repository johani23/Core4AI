// ============================================================================
// ðŸ’š CampaignAudiencePersona.jsx (Phase 22 â€“ Audience Persona Generator)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function CampaignAudiencePersona({
  product,
  productIQ,
  merchantIntel,
  readiness
}) {
  const [persona, setPersona] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/persona", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        feature_value: productIQ.feature_value,
        intel_score: merchantIntel.feature_advantage_score,
        readiness: readiness
      })
    });

    const data = await res.json();
    setPersona(data);
  };

  useEffect(() => {
    if (product && productIQ && merchantIntel && readiness !== null) load();
  }, [product, productIQ, merchantIntel, readiness]);

  if (!persona)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Generating Persona</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">
      
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ§ Audience Persona
      </h2>

      <p className="text-2xl font-bold text-gray-800 mb-2">
        {persona.name}
      </p>

      <p className="text-gray-700 mb-3">
        <strong>Age Range:</strong> {persona.age_range}
      </p>

      <p className="text-gray-700 mb-3">
        <strong>Gender:</strong> {persona.gender}
      </p>

      <p className="text-gray-700 mb-3">
        <strong>Budget Level:</strong> {persona.budget_level}
      </p>

      <div className="mt-4 p-4 bg-gray-50 border rounded">
        <h3 className="font-bold text-gray-800 mb-2">Traits</h3>
        <ul className="list-disc pl-6 space-y-1">
          {persona.traits.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
