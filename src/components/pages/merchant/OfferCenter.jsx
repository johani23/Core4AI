// ============================================================================
// 💚 Core4.AI – OfferCenter (FINAL — Human + Safe + MIT Linked)
// ============================================================================

import React, { useState, useEffect } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function OfferCenter() {
  // --------------------------------------------------------------------------
  // LOAD OFFERS
  // --------------------------------------------------------------------------
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({
    code: "",
    type: "percent", // percent | fixed
    value: "",
    expires: "",
  });

  // --------------------------------------------------------------------------
  // LOAD PROFIT ANALYSIS FROM PricingCenter
  // --------------------------------------------------------------------------
  const profit = JSON.parse(
    localStorage.getItem("core4ai_profit_analysis") || "null"
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("core4ai_offers") || "[]");
    setOffers(saved);
  }, []);

  // --------------------------------------------------------------------------
  // DERIVED VALUES
  // --------------------------------------------------------------------------
  const safeLimit = profit?.maxSafeDiscount ?? 0;
  const smartPrice = profit?.smartPrice ?? null;

  const discountValue =
    form.type === "percent" && smartPrice
      ? (Number(form.value || 0) / 100) * smartPrice
      : Number(form.value || 0);

  const isSafe = discountValue <= safeLimit;

  // --------------------------------------------------------------------------
  // CREATE OFFER
  // --------------------------------------------------------------------------
  const createOffer = () => {
    if (!form.code || !form.value) {
      alert("يرجى إدخال كود الخصم وقيمة الخصم");
      return;
    }

    if (!isSafe) {
      alert(
        `⚠️ الخصم المقترح (${discountValue} ريال) أكبر من الحد الآمن (${safeLimit} ريال)`
      );
      return;
    }

    const newOffer = {
      id: Date.now(),
      code: form.code.trim().toUpperCase(),
      type: form.type,
      value: Number(form.value),
      expires: form.expires || null,
      status: "active",
      created_at: new Date().toISOString(),
    };

    const updated = [newOffer, ...offers];
    setOffers(updated);
    localStorage.setItem("core4ai_offers", JSON.stringify(updated));

    setForm({ code: "", type: "percent", value: "", expires: "" });
    alert("✔ تم إنشاء العرض بأمان");
  };

  const markExpired = (id) => {
    const updated = offers.map((o) =>
      o.id === id ? { ...o, status: "expired" } : o
    );
    setOffers(updated);
    localStorage.setItem("core4ai_offers", JSON.stringify(updated));
  };

  const active = offers.filter((o) => o.status === "active");
  const expired = offers.filter((o) => o.status === "expired");

  // --------------------------------------------------------------------------
  // UI
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-5xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold mb-2">العروض والخصومات</h1>
      <p className="text-gray-500 mb-8">
        أنشئ عروضًا آمنة مبنية على التسعير الذكي والتكاليف الفعلية.
      </p>

      {/* ================= PROFIT PROTECTION ================= */}
      {profit && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
          <p className="font-bold text-green-800">
            🧠 حماية الربحية مفعّلة (من PricingCenter)
          </p>
          <p className="text-sm text-green-700 mt-1">
            السعر الذكي (MIT): {smartPrice} ريال — أقصى خصم آمن:
            <strong> {safeLimit} ريال</strong>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            المستفيد من هذا القيد: Merchant → Treasury → Campaign ROI
          </p>
        </div>
      )}

      {/* ================= HOW TO USE ================= */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <p className="font-bold text-blue-800 mb-1">💡 كيف تستخدم هذا القسم؟</p>
        <ul className="list-disc pr-6 text-sm text-blue-700 space-y-1">
          <li>كود الخصم: أي كلمة (الاسم لا يؤثر على الحساب).</li>
          <li>اختر نوع الخصم: نسبة (%) أو مبلغ ثابت (ريال).</li>
          <li>اكتب رقم فقط — لا تكتب % ولا ريال.</li>
          <li>النظام يمنعك تلقائيًا من الخصم الخاسر.</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ================= CREATE OFFER ================= */}
        <motion.div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">➕ إنشاء عرض جديد</h2>

          <Field
            label="كود الخصم"
            placeholder="مثال: WINTER2025"
            value={form.code}
            onChange={(v) => setForm({ ...form, code: v })}
          />

          <Field
            label="نوع الخصم"
            type="select"
            value={form.type}
            onChange={(v) => setForm({ ...form, type: v })}
            options={[
              { value: "percent", label: "نسبة مئوية (%)" },
              { value: "fixed", label: "مبلغ ثابت (ريال)" },
            ]}
          />

          <Field
            label={
              form.type === "percent"
                ? "قيمة الخصم (%)"
                : "قيمة الخصم (ريال)"
            }
            type="number"
            placeholder="اكتب رقم فقط"
            value={form.value}
            onChange={(v) => setForm({ ...form, value: v.replace(/^0+/, "") })}
          />

          <Field
            label="تاريخ الانتهاء (اختياري)"
            type="date"
            value={form.expires}
            onChange={(v) => setForm({ ...form, expires: v })}
          />

          {/* LIVE FEEDBACK */}
          {form.value && (
            <p
              className={`text-sm mt-3 font-bold ${
                isSafe ? "text-green-700" : "text-red-600"
              }`}
            >
              {isSafe
                ? `✅ الخصم يعادل ${discountValue} ريال — آمن`
                : `⚠️ الخصم يعادل ${discountValue} ريال — غير آمن`}
            </p>
          )}

          <button
            className="btn-green w-full mt-6 py-3"
            onClick={createOffer}
          >
            ✔ إنشاء العرض
          </button>
        </motion.div>

        {/* ================= ACTIVE / EXPIRED ================= */}
        <div className="lg:col-span-2 space-y-8">
          <Section
            title="العروض النشطة"
            list={active}
            markExpired={markExpired}
          />
          <Section
            title="العروض المنتهية"
            list={expired}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>

    {type === "select" ? (
      <select
        className="w-full border rounded-lg p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        className="w-full border rounded-lg p-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

const Section = ({ title, list, markExpired, disabled }) => (
  <section className="bg-white border rounded-xl p-6 shadow-sm">
    <h2 className="text-xl font-bold mb-4">{title}</h2>

    {list.length === 0 && (
      <p className="text-gray-500 text-sm">لا يوجد عناصر.</p>
    )}

    {list.map((offer) => (
      <div key={offer.id} className="border rounded-lg p-4 mb-3">
        <p className="font-bold">{offer.code}</p>
        <p className="text-sm text-gray-600">
          {offer.type === "percent"
            ? `${offer.value}% خصم`
            : `${offer.value} ريال خصم`}
        </p>

        {!disabled && (
          <button
            className="btn-gray mt-2"
            onClick={() => markExpired(offer.id)}
          >
            إنهاء العرض
          </button>
        )}
      </div>
    ))}
  </section>
);
