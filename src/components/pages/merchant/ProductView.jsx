import { useParams, useNavigate } from "react-router-dom";

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-16 text-center" dir="rtl">
      <h1 className="text-3xl font-bold mb-4">
        المنتج رقم {id}
      </h1>

      <p className="text-gray-500 mb-10">
        اختر الإجراء الذي تريد تنفيذه على هذا المنتج
      </p>

      <div className="flex justify-center gap-6 flex-wrap">
        <button
          onClick={() => navigate(`/merchant/pricing/${id}`)}
          className="px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
        >
          💰 التسعير الذكي (MIT)
        </button>

        <button
          onClick={() => navigate(`/merchant/market-insights/${id}`)}
          className="px-6 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700"
        >
          📊 تحليل السوق (MIT)
        </button>

        <button
          onClick={() => navigate(`/merchant/products/${id}/edit`)}
          className="px-6 py-4 bg-gray-200 rounded-xl font-bold hover:bg-gray-300"
        >
          ✏️ تعديل المنتج
        </button>
      </div>
    </div>
  );
}
