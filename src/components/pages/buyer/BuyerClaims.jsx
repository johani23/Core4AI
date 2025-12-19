// ============================================================================
// 🛡 Core4.AI – BuyerClaims FINAL API EDITION (v3)
// Loads real orders • Posts claim • Clean RTL UI
// ============================================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyerClaims() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    orderId: "",
    issue: "",
    description: "",
    images: [],
  });

  // ✅ Backend base (REQUIRED)
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://core4ai-backend-o3ie.onrender.com";

  // ---------------------------------------------------------------------------
  // Load real orders from backend
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/orders?buyer_id=1`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("BuyerClaims: failed to load orders", err);
      } finally {
        setLoadingOrders(false);
      }
    }
    load();
  }, [API_BASE]);

  // ---------------------------------------------------------------------------
  // Handle image uploads
  // ---------------------------------------------------------------------------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });
  };

  // ---------------------------------------------------------------------------
  // Submit claim to backend
  // ---------------------------------------------------------------------------
  const submitClaim = async () => {
    if (!form.orderId || !form.issue || !form.description) {
      alert("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    try {
      setSubmitting(true);

      const body = new FormData();
      body.append("order_id", form.orderId);
      body.append("issue", form.issue);
      body.append("description", form.description);

      form.images.forEach((img) => {
        body.append("files", img);
      });

      const res = await fetch(`${API_BASE}/api/claims`, {
        method: "POST",
        body,
      });

      if (!res.ok) throw new Error("Failed to submit claim");

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إرسال المطالبة.");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Success State UI
  // ---------------------------------------------------------------------------
  if (submitted) {
    return (
      <div
        className="min-h-screen bg-[#0A0F12] text-white flex flex-col items-center justify-center p-8"
        dir="rtl"
      >
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          تم إرسال المطالبة بنجاح 🛡
        </h1>
        <p className="text-gray-300 mb-6">
          سيتم مراجعتها من فريق Core4.AI خلال وقت قصير.
        </p>

        <button
          onClick={() => navigate("/buyer/orders")}
          className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-xl font-semibold"
        >
          عرض الطلبات
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Main UI
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8" dir="rtl">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-300 hover:text-white mb-6"
      >
        ← رجوع
      </button>

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-purple-400 mb-2">
        فتح مطالبة جديدة 🛡
      </h1>
      <p className="text-gray-300 mb-8">
        ساعدنا في فهم المشكلة لحلّها بسرعة.
      </p>

      {/* FORM CARD */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-sm">
        {/* ORDER FIELD */}
        <label className="text-gray-300 text-sm mb-2 block">رقم الطلب</label>

        {loadingOrders ? (
          <p className="text-gray-400 text-sm mb-6">
            ... جاري تحميل الطلبات
          </p>
        ) : (
          <select
            value={form.orderId}
            onChange={(e) =>
              setForm({ ...form, orderId: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 mb-6"
          >
            <option value="">اختر رقم الطلب</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                #{o.id} — {o.product_name}
              </option>
            ))}
          </select>
        )}

        {/* ISSUE FIELD */}
        <label className="text-gray-300 text-sm mb-2 block">
          نوع المشكلة
        </label>
        <select
          value={form.issue}
          onChange={(e) =>
            setForm({ ...form, issue: e.target.value })
          }
          className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 mb-6"
        >
          <option value="">اختر المشكلة</option>
          <option value="delay">تأخير في التوصيل</option>
          <option value="damage">المنتج تالف</option>
          <option value="wrong">استلمت منتجًا مختلفًا</option>
          <option value="missing">قطع ناقصة</option>
          <option value="guarantee">مشكلة في الضمان</option>
          <option value="other">أخرى</option>
        </select>

        {/* DESCRIPTION */}
        <label className="text-gray-300 text-sm mb-2 block">
          وصف المشكلة
        </label>
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 h-32 resize-none mb-6"
          placeholder="اكتب وصف المشكلة…"
        />

        {/* IMAGES */}
        <label className="text-gray-300 text-sm mb-2 block">
          صور (اختياري)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 mb-4"
        />

        {form.images.length > 0 && (
          <div className="flex gap-3 mb-6 flex-wrap">
            {form.images.map((img, i) => (
              <div
                key={i}
                className="w-20 h-20 border border-white/20 rounded-xl overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(img)}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* SUBMIT */}
        <button
          onClick={submitClaim}
          disabled={submitting}
          className="
            w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl
            font-bold text-sm shadow-lg shadow-red-700/20
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {submitting ? "جارٍ الإرسال…" : "🛡 إرسال المطالبة"}
        </button>
      </div>
    </div>
  );
}
