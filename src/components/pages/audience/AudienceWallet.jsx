// ============================================================================
// 💚 Core4.AI – AudienceWallet.jsx (Arabic Clean Edition)
// ============================================================================
// - واجهة محفظة الجمهور بالكامل باللغة العربية
// - يحافظ على نفس الـ UI والـ Layout
// - بدون أي تغيير في المنطق الداخلي (XP / Tokens / Rewards / Products)
// ============================================================================

import { useState, useEffect } from "react";
import { useCoreSync } from "@/context/CoreSyncContext";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";

export default function AudienceWallet() {
  const { wsData } = useCoreSync();

  const [tokens, setTokens] = useState(0);
  const [xp, setXP] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!wsData) return;

    if (wsData.type === "reward_event") {
      setTokens((prev) => prev + wsData.tokens_gain);
      setRewards((prev) => [wsData, ...prev]);
    }

    if (wsData.type === "xp_update") {
      setXP(wsData.total_xp);
    }

    if (wsData.type === "product_owned") {
      setProducts((prev) => [...prev, wsData.product_name]);
    }
  }, [wsData]);

  return (
    <div
      className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10"
      style={{ direction: "rtl" }}
    >
      {/* HEADER */}
      <CoreHeader
        title="محفظة المكافآت"
        subtitle="تابع نقاط XP، التوكنز، المكافآت، والمنتجات اللي تمتلكها."
        icon="💰"
      />

      {/* MAIN KPIs */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">

        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">إجمالي التوكنز</p>
          <p className="text-5xl font-extrabold text-[#CBA65C]">
            {tokens}
          </p>
        </CorePanel>

        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">إجمالي نقاط XP</p>
          <p className="text-5xl font-extrabold text-[#4FBF77]">
            {xp}
          </p>
        </CorePanel>

      </div>

      {/* OWNED PRODUCTS */}
      <div className="max-w-4xl">
        <h2 className="text-xl font-bold text-[#CBA65C] mb-3">المنتجات اللي تمتلكها</h2>

        <CorePanel className="space-y-3">
          {products.length === 0 ? (
            <p className="text-gray-500">ما تمتلك أي منتجات حتى الآن.</p>
          ) : (
            products.map((p, i) => (
              <div key={i} className="bg-[#11161A] p-3 rounded-xl text-gray-300">
                {p}
              </div>
            ))
          )}
        </CorePanel>
      </div>

      {/* REWARD HISTORY */}
      <div className="max-w-4xl">
        <h2 className="text-xl font-bold text-[#CBA65C] mb-3">سجل المكافآت</h2>

        <CorePanel className="space-y-3 max-h-96 overflow-y-auto">

          {rewards.length === 0 ? (
            <p className="text-gray-500">ما فيه مكافآت حتى الآن.</p>
          ) : (
            rewards.map((r, i) => (
              <div key={i} className="bg-[#11161A] p-4 rounded-xl text-gray-300">
                <p><strong>السبب:</strong> {r.reason}</p>
                <p><strong>التوكنز:</strong> {r.tokens_gain}</p>
                <p><strong>XP:</strong> {r.xp_gain}</p>
              </div>
            ))
          )}

        </CorePanel>
      </div>

    </div>
  );
}
