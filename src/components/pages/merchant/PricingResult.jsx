// ============================================================================
// 💚 Core4.AI – PricingResult.jsx (Arabic RTL Premium Edition)
// ============================================================================
// - Arabic Clean Text
// - RTL Friendly
// - Same UI & Layout
// ============================================================================

export default function PricingResult({ bestPrice, range }) {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6" dir="rtl">

      <h1 className="text-2xl font-bold text-green-700 mb-4">
        أفضل سعر مُقترح للمنتج
      </h1>

      <div className="bg-green-100 border border-green-300 p-5 rounded-lg">
        <p className="text-xl font-bold">
          السعر المناسب للمنتج:{" "}
          <span className="text-green-800">{bestPrice} ريال</span>
        </p>

        <p className="text-gray-700 mt-2">
          النطاق المقترح للتسعير:{" "}
          <span className="font-semibold">{range}</span>
        </p>
      </div>

      <button
        className="btn-yellow mt-8 w-full"
        onClick={() => (window.location.href = "/merchant/campaign")}
      >
        إنشاء حملة تسويقية
      </button>

    </div>
  );
}
