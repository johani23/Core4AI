// ============================================================================
// 💚 Core4.AI – BuyerHome.jsx (Polished v2 – Final Clean Version)
// ============================================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import BuyerLayout from "../../buyer/BuyerLayout";
import BuyerSectionCard from "../../buyer/BuyerSectionCard";
import BuyerStatPill from "../../buyer/BuyerStatPill";

export default function BuyerHome() {
  const navigate = useNavigate();

  return (
    <BuyerLayout
      title="Buyer Console"
      subtitle="كل مشترياتك وتجاربك وحمايتك في منصة واحدة."
    >
      {/* Stats */}
      <div className="flex flex-wrap gap-3 mb-8">
        <BuyerStatPill label="My Purchases" value="3 طلبات" tone="positive" />
        <BuyerStatPill label="Hot Posts" value="1 منشور" tone="positive" />
        <BuyerStatPill label="Open Claims" value="0 بلاغ" tone="neutral" />
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <BuyerSectionCard
          title="My Purchases"
          description="شوف كل مشترياتك، حالة الشحن، والتتبع – مثل Amazon."
          icon="🛒"
          badge="Track"
          actionLabel="View purchases"
          onClick={() => navigate("/buyer/purchases")}
        />

        <BuyerSectionCard
          title="My Activity"
          description="تجاربك، مراجعاتك، وتأثيرك على التسعير."
          icon="📊"
          actionLabel="Open activity"
          onClick={() => navigate("/buyer/activity")}
        />

        <BuyerSectionCard
          title="Buyer Protection"
          description="لو التجربة سيئة… بلغ واحصل على التعويض العادل."
          icon="🛡️"
          badge="Protection"
          actionLabel="Open claim center"
          onClick={() => navigate("/buyer/claims")}
        />

        <BuyerSectionCard
          title="My Referrals"
          description="شارك كودك مع أصدقائك وخليهم يدخلون عالم Core4.AI."
          icon="🤝"
          actionLabel="View referrals"
          onClick={() => navigate("/buyer/referrals")}
        />

        <BuyerSectionCard
          title="Innovation Lab"
          description="اقترح تحسينات للمنتجات – تربح عمولة مدى الحياة."
          icon="🧪"
          badge="Earn Forever"
          actionLabel="Suggest feature"
          onClick={() => navigate("/buyer/rnd")}
        />

        <BuyerSectionCard
          title="Upgrade to Creator"
          description="تعرّف على مسارك للترقية إلى Influencer."
          icon="🚀"
          actionLabel="View upgrade path"
          onClick={() => navigate("/buyer/upgrade")}
        />

      </div>
    </BuyerLayout>
  );
}
