import React, { useState } from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function SubmitReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendEvent } = useCoreSync();

  const { product } = location.state || {};
  const [text, setText] = useState("");

  const sendReview = async () => {
    if (!text.trim()) return;

    // 1) إرسال الحدث إلى CoreSync (in-memory)
    sendEvent({
      type: "BUYER_REVIEW_SUBMITTED",
      product,
      text,
      xp: 10,
      timestamp: new Date().toISOString(),
    });

    // 2) حفظ دور المستخدم كـ Buyer
    localStorage.setItem("userRole", "buyer");

    // 3) الانتقال مباشرة للوحة التحكم
    navigate("/buyer/dashboard", { replace: true });
  };

  return (
    <div
      className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10"
      style={{ direction: "rtl" }}
    >
      <CoreHeader
        title={`مراجعة: ${product}`}
        subtitle="اكتب رأيك بصراحة — نقاط الـ XP تعتمد على جودة تقييمك."
        icon="📝"
      />

      <CorePanel className="max-w-2xl mx-auto">

        {/* Text Area */}
        <textarea
          className="w-full h-40 p-4 bg-[#11161A] border border-[#4FBF77]/30 rounded-xl text-white"
          placeholder="اكتب مراجعتك هنا..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Submit Button */}
        <CoreButton
          label="إرسال المراجعة"
          onClick={sendReview}
          className="mt-4"
        />

      </CorePanel>
    </div>
  );
}
