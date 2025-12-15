import React from "react";
import CorePanel from "@/components/ui/CorePanel";
import CoreHeader from "@/components/ui/CoreHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      {/* PAGE HEADER */}
      <CoreHeader 
        title="Home"
        subtitle="Explore creators, tribes, and high-value content powered by the Saudi Influence Engine."
        icon="ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â "
      />

      {/* TRENDING NOW */}
      <CorePanel className="hover:shadow-[0_0_45px_rgba(0,108,53,0.25)] transition-all">
        <h2 className="text-xl font-bold text-[#CBA65C] mb-2">ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Trending Now</h2>
        <p className="text-gray-400 text-sm">Your feed is loadingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</p>
      </CorePanel>

      {/* EXPLORE TRIBES */}
      <CorePanel className="hover:shadow-[0_0_45px_rgba(0,108,53,0.25)] transition-all">
        <h2 className="text-xl font-bold text-[#CBA65C] mb-2">ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Explore Tribes</h2>
        <p className="text-gray-400 text-sm">Discover tribes that match your interests.</p>
      </CorePanel>

      {/* SPACE FOR FUTURE SECTIONS */}
      <div className="h-20" />

    </div>
  );
}

