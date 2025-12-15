// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥ TribeMemberList.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Saudi-Tech A3 Edition
// ----------------------------------------------------------------------------
// - Beautiful Saudi dark theme
// - Clean member cards
// - Actions using CoreButton
// ============================================================================

import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function TribeMemberList() {
  const { wsData } = useCoreSync();

  const members = wsData?.tribe_members || [];

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      <CoreHeader
        title="Tribe Members"
        subtitle="Monitor activity, manage membership and ensure authenticity."
        icon="ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥"
      />

      <div className="space-y-6 max-w-4xl">
        {members.length === 0 ? (
          <CorePanel>No members found.</CorePanel>
        ) : (
          members.map((m, i) => (
            <CorePanel key={i} className="flex justify-between items-center">
              
              <div>
                <p className="text-xl font-bold text-[#4FBF77]">{m.name}</p>
                <p className="text-sm text-gray-400">
                  {m.status.toUpperCase()} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ XP {m.xp}
                </p>
              </div>

              <div className="flex gap-3">
                <CoreButton label="Approve" onClick={() => alert("approve")} />
                <CoreButton label="Flag" variant="secondary" onClick={() => alert("flag")} />
                <CoreButton label="Kick" variant="danger" onClick={() => alert("kick")} />
              </div>

            </CorePanel>
          ))
        )}
      </div>

    </div>
  );
}


