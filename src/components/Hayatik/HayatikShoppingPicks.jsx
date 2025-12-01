// ============================================================================
// 💚 Core4 حياتك – HayatikShoppingPicks.jsx (v1 Minimal Lifestyle Catalog)
// ============================================================================

import React, { useEffect, useState } from "react";

export default function HayatikShoppingPicks() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    // Later → connect to /api/hayatik/shopping
    const demo = [
      {
        title: "منظف أرضيات فندقي",
        desc: "يعطي لمعة فخمة ويخلّي ريحة البيت نظيفة.",
        price: "29 ريال",
      },
      {
        title: "قهوة محمصة مختصة",
        desc: "تناسب مزاجك وتضبط صباحك.",
        price: "38 ريال",
      },
      {
        title: "مناديل معطرة",
        desc: "مثالية للاستخدام اليومي.",
        price: "12 ريال",
      },
      {
        title: "منظف أسطح متعدد",
        desc: "لترتيب وتنظيم أسرع بدون عناء.",
        price: "18 ريال",
      },
      {
        title: "شمعة روائح مهدئة",
        desc: "أجواء مسائية هادئة ومريحة.",
        price: "54 ريال",
      },
    ];

    setItems(demo);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-[#1A1A1A]">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 text-[#2A2F32]">
        منتجات تناسب حياتك
      </h1>

      {/* Loading */}
      {!items && (
        <p className="text-gray-400 text-center py-6">...يتم التحميل</p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {items &&
          items.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-[#F7F8F9] rounded-2xl shadow-sm hover:shadow transition"
            >
              <h3 className="text-lg font-semibold text-[#4CAF9B]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>

              <div className="mt-4 text-[#2A2F32] font-medium">
                {item.price}
              </div>

              <button
                className="mt-5 w-full py-3 rounded-xl bg-[#4CAF9B] text-white font-medium hover:opacity-90 transition"
                onClick={() => console.log("Added:", item.title)}
              >
                أضف للسلة
              </button>
            </div>
          ))}

      </div>
    </div>
  );
}
