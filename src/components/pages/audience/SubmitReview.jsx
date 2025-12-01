import React, { useState } from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function SubmitReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendEvent } = useCoreSync();   // â­ Ù†Ø³ØªÙ‚Ø¨Ù„ Ø¨Ø« CoreSync
  const { product } = location.state || {};
  const [text, setText] = useState("");

  const sendReview = async () => {
  if (!text.trim()) return;

  // â­ 1) Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø­Ø¯Ø« Ø¥Ù„Ù‰ CoreSync (in-memory)
  sendEvent({
    type: "BUYER_REVIEW_SUBMITTED",
    product,
    text,
    xp: 10,
    timestamp: new Date().toISOString(),
  });

  // â­ 2) Ø¥Ø¬Ø¨Ø§Ø± Ø§Ù„Ù†Ø¸Ø§Ù… Ø¹Ù„Ù‰ ØªØ«Ø¨ÙŠØª Ø¯ÙˆØ± Buyer
  localStorage.setItem("userRole", "buyer");

  // â­ 3) Ø§Ù„ØªÙˆØ¬ÙŠÙ‡ Ø¥Ù„Ù‰ Buyer Dashboard Ø¨Ø¯ÙˆÙ† Ø¥Ù…ÙƒØ§Ù†ÙŠØ© Ø±Ø¬ÙˆØ¹
  navigate("/buyer/dashboard", { replace: true });
};

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">
      <CoreHeader
        title={`Review: ${product}`}
        subtitle="Write your honest feedback â€” your XP depends on it."
        icon="ðŸ“"
      />

      <CorePanel className="max-w-2xl mx-auto">
        <textarea
          className="w-full h-40 p-4 bg-[#11161A] border border-[#4FBF77]/30 rounded-xl text-white"
          placeholder="Write your review here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <CoreButton
          label="Submit Review"
          onClick={sendReview}
          className="mt-4"
        />
      </CorePanel>
    </div>
  );
}
