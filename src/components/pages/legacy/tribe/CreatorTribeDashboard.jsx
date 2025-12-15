// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â CreatorTribeDashboard.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Saudi-Tech A3 Edition
// ----------------------------------------------------------------------------
// - Clean dashboard for tribe leaders
// - Gold metrics + Green glow
// - Unified layout with CorePanel + CoreHeader
// ============================================================================

import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useCoreSync } from "@/context/CoreSyncContext";
import { useNavigate } from "react-router-dom";

export default function CreatorTribeDashboard() {
  const { wsData } = useCoreSync();
  const navigate = useNavigate();

  const stats = wsData?.tribe_stats || {
    members: 0,
    pending: 0,
    suspicious: 0,
  };

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      <CoreHeader
        title="Tribe Governance"
        subtitle="Lead your tribe, manage members, and verify review authenticity."
        icon="ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â"
      />

      {/* KPI Panels */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl">

        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">Active Members</p>
          <p className="text-4xl font-bold text-[#4FBF77]">
            {stats.members}
          </p>
        </CorePanel>

        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">Pending Reviews</p>
          <p className="text-4xl font-bold text-[#CBA65C]">
            {stats.pending}
          </p>
        </CorePanel>

        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">Suspicious Members</p>
          <p className="text-4xl font-bold text-red-400">
            {stats.suspicious}
          </p>
        </CorePanel>

      </div>

      {/* ACTIONS */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl">

        <CorePanel className="text-center py-6">
          <CoreButton
            label="Manage Members"
            onClick={() => navigate("/tribe/members")}
          />
        </CorePanel>

        <CorePanel className="text-center py-6">
          <CoreButton
            label="Review Verification"
            variant="secondary"
            onClick={() => navigate("/tribe/reviews")}
          />
        </CorePanel>

        <CorePanel className="text-center py-6">
          <CoreButton
            label="Sub-Tribe Manager"
            variant="secondary"
          />
        </CorePanel>
      </div>

    </div>
  );
}


