import React from "react";

export default function Content() {
  return (
    <div className="card" dir="rtl">
      <h2>📚 Content</h2>
      <p>هنا محتوى معرفي وتجارب من <strong>Clusterverse</strong>.</p>
      <ul className="list-disc pr-6 space-y-2">
        <li><strong>مقال:</strong> كيف تعمل الـ Clusters؟</li>
        <li><strong>تجربة:</strong> قصة نجاح من Inner Circle</li>
      </ul>
      <p className="mt-6 text-gray-600">✨ استكشف المزايا وابدأ رحلتك في Clusterverse!</p>
    </div>
  );
}
