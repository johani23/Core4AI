import { useNavigate } from "react-router-dom";

export default function ProductRequiredNotice({
  title = "اختر منتجًا أولًا",
  description = "هذه الصفحة مرتبطة بمنتج محدد. يرجى اختيار منتج من مركز المنتجات للمتابعة.",
  ctaLabel = "الذهاب إلى مركز المنتجات",
}) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-[70vh] text-center px-6"
      dir="rtl"
    >
      <div className="text-6xl mb-6">📦</div>

      <h2 className="text-2xl font-bold mb-3">{title}</h2>

      <p className="text-gray-500 max-w-md mb-8">
        {description}
      </p>

      <button
        onClick={() => navigate("/merchant/products")}
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
