// ============================================================================
// 💚 Core4 حياتك – HayatikFlow.jsx (v1 Minimal Daily Timeline)
// ============================================================================

import React from "react";

export default function HayatikFlow({ flow }) {
  if (!flow) {
    return (
      <div className="text-gray-400 text-center py-6">
        ...يتم التحميل
      </div>
    );
  }

  return (
    <div className="mt-12">

      {/* Title */}
      <h2 className="text-xl font-medium mb-4 text-[#2A2F32]">
        يومك باختصار
      </h2>

      {/* Timeline Wrapper */}
      <div className="bg-[#F7F8F9] rounded-2xl shadow-sm p-6">

        {/* Timeline */}
        <div className="relative border-r-2 border-[#4CAF9B] pr-6">

          {flow.map((item, index) => (
            <div key={index} className="mb-8 last:mb-0 relative">

              {/* Dot */}
              <div className="absolute -right-[10px] top-1.5 w-4 h-4 bg-[#4CAF9B] rounded-full shadow-sm"></div>

              {/* Time */}
              <div className="text-sm text-[#4CAF9B] font-semibold mb-1">
                {item.time}
              </div>

              {/* Title */}
              <div className="text-lg text-[#1A1A1A] font-medium">
                {item.title}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-1">
                {item.details}
              </p>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
