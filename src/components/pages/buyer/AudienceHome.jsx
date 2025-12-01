import React, { useState } from "react";
import { AudienceProvider } from "@/context/AudienceContext";
import AudiencePersonaBadge from "./AudiencePersonaBadge";
import AudienceFeed from "./AudienceFeed";
import AudienceInsightsPanel from "./AudienceInsightsPanel";
import TribeTabs from "./TribeTabs";

export default function AudienceHome() {
  const [activeTribe, setActiveTribe] = useState("All");

  return (
    <AudienceProvider>
      <div className="max-w-7xl mx-auto mt-10 px-4 pb-20" dir="rtl">

        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          جمهورك أنت… هو محرك التأثير 💚
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          كل تفاعل… كل مشاهدة… كل حفظ، يتحول إلى إشارة ذكية.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">

          <div>
            <AudiencePersonaBadgeWrapper />

            <TribeTabs onChange={(t) => setActiveTribe(t)} />

            <AudienceFeed activeTribe={activeTribe} />
          </div>

          <div>
            <AudienceInsightsPanel />
          </div>

        </div>
      </div>
    </AudienceProvider>
  );
}

import { useAudience } from "@/context/AudienceContext";
function AudiencePersonaBadgeWrapper() {
  const { persona } = useAudience();
  return <AudiencePersonaBadge persona={persona} />;
}
