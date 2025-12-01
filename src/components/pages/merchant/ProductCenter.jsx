// ============================================================
// ðŸ’š Core4.AI â€“ ProductCenter.jsx (v12 Stable)
// ------------------------------------------------------------
// Product listing hub + links to Pricing, Analytics, MIT
// ============================================================

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  CubeIcon,
  ChartBarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function ProductCenter() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      { id: 1, name: "Wireless Earbuds", price: 129, views: 2340, sales: 180 },
      { id: 2, name: "Smart Watch X", price: 299, views: 5430, sales: 410 },
      { id: 3, name: "Premium Backpack", price: 52, views: 950, sales: 72 },
    ]);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Product Center</h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor your entire product catalog.
          </p>
        </div>

        <Link
          to="/merchant/products/add"
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gray-900 text-white p-3 rounded-lg">
                <CubeIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-md font-semibold">${product.price}</p>
              </div>

              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Views</p>
                <p className="text-md font-semibold">{product.views}</p>
              </div>

              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Sales</p>
                <p className="text-md font-semibold">{product.sales}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to={`/merchant/pricing?id=${product.id}`}
                className="flex items-center text-green-700 hover:text-green-900 transition"
              >
                <TagIcon className="w-5 h-5 mr-1" />
                Pricing
              </Link>

              <Link
                to={`/merchant/analytics?id=${product.id}`}
                className="flex items-center text-gray-700 hover:text-gray-900 transition"
              >
                <ChartBarIcon className="w-5 h-5 mr-1" />
                Analytics
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
