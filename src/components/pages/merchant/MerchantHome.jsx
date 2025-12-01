// ======================================================================
// 💚 MerchantHome.jsx — النسخة العربية المبسّطة
// ======================================================================

import React from "react";

export default function MerchantHome() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">

      <h1 className="text-3xl font-bold text-green-700 mb-8">
        مركز التاجر
      </h1>

      <p className="text-gray-600 mb-10">
        خلّنا نرفع مبيعاتك بخطوات بسيطة… بدون كلام معقد.
      </p>

      <div className="grid grid-cols-1 gap-6">
        
        <button 
          onClick={() => window.location.href = "/merchant/add-product"}
          className="bg-green-600 text-white p-5 rounded-xl text-xl font-bold hover:bg-green-700"
        >
          ➕ أضف منتج جديد
        </button>

        <button 
          onClick={() => window.location.href = "/merchant/campaign"}
          className="bg-blue-600 text-white p-5 rounded-xl text-xl font-bold hover:bg-blue-700"
        >
          📈 سَوِّ حملة تسويق
        </button>

        <button 
          onClick={() => window.location.href = "/merchant/earnings"}
          className="bg-yellow-500 text-white p-5 rounded-xl text-xl font-bold hover:bg-yellow-600"
        >
          💰 أرباحي
        </button>

        <button 
          onClick={() => window.location.href = "/merchant/influencers"}
          className="bg-purple-600 text-white p-5 rounded-xl text-xl font-bold hover:bg-purple-700"
        >
          👥 المؤثرين
        </button>

      </div>
    </div>
  );
}
