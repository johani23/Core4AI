// ============================================================================
// ðŸª MerchantHub.jsx â€” Saudi-Tech A3 Edition (v12.1 â€“ Pricing Fixed)
// ============================================================================

import React from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useNavigate } from "react-router-dom";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function MerchantHub() {
  const navigate = useNavigate();
  const { wsData } = useCoreSync();

  const stats = {
    totalProducts: wsData?.merchant_products || 0,
    totalOrders: wsData?.merchant_orders || 0,
    revenue: wsData?.merchant_revenue || 0,
  };

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-12">

      <CoreHeader
        title="Merchant Dashboard"
        subtitle="Manage your products, campaigns, analytics and storefront."
        icon="ðŸª"
      />

      {/* KPIs */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl">

        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">Active Products</p>
          <p className="text-4xl font-extrabold text-[#4FBF77]">
            {stats.totalProducts}
          </p>
        </CorePanel>

        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-4xl font-extrabold text-[#CBA65C]">
            {stats.totalOrders}
          </p>
        </CorePanel>

        <CorePanel className="text-center">
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <p className="text-4xl font-extrabold text-[#4FBF77]">
            {stats.revenue} SAR
          </p>
        </CorePanel>

      </div>

      {/* Merchant Tools */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl">

        <CorePanel className="text-center py-6">
          <h3 className="text-xl font-bold text-[#CBA65C] mb-2">Add Product</h3>
          <CoreButton label="Open" onClick={() => navigate("/merchant/add-product")} />
        </CorePanel>

        <CorePanel className="text-center py-6">
          <h3 className="text-xl font-bold text-[#CBA65C] mb-2">Product List</h3>
          <CoreButton label="View" onClick={() => navigate("/merchant/products/list")} />
        </CorePanel>

        <CorePanel className="text-center py-6">
          <h3 className="text-xl font-bold text-[#CBA65C] mb-2">Campaign Builder</h3>
          <CoreButton label="Launch" onClick={() => navigate("/merchant/campaign-builder")} />
        </CorePanel>

        <CorePanel className="text-center py-6">
          <h3 className="text-xl font-bold text-[#CBA65C] mb-2">Creative Studio</h3>
          <CoreButton label="Generate" onClick={() => navigate("/merchant/creative")} />
        </CorePanel>

        <CorePanel className="text-center py-6">
          <h3 className="text-xl font-bold text-[#CBA65C] mb-2">Ad Calculator</h3>
          <CoreButton label="Open" onClick={() => navigate("/merchant/ad-calculator")} />
        </CorePanel>

        <CorePanel className="text-center py-6">
          <h3 className="text-xl font-bold text-[#CBA65C] mb-2">Merchant Intel</h3>
          <CoreButton label="Insights" onClick={() => navigate("/merchant/intel")} />
        </CorePanel>

        {/* UPDATED â€” Pricing Tools */}
        <CorePanel className="text-center py-6">
          <h3 className="text-xl font-bold text-[#CBA65C] mb-2">Pricing Tools</h3>
          <CoreButton 
            label="Open MIT Tools" 
            onClick={() => navigate("/analytics?tab=pricing")} 
          />
        </CorePanel>

        {/* UPDATED â€” Pricing Intelligence */}
        <CorePanel className="text-center py-6">
          <h3 className="text-xl font-bold text-[#CBA65C] mb-2">Pricing Intelligence</h3>
          <CoreButton 
            label="Open Dashboard" 
            onClick={() => navigate("/analytics?tab=pricing")} 
          />
        </CorePanel>

      </div>

      {/* Storefront */}
      <div className="max-w-5xl">
        <h3 className="text-xl font-bold text-[#CBA65C] mb-4">Storefront</h3>

        <CorePanel className="flex justify-between items-center p-6">
          <div>
            <p className="text-gray-400 text-sm">Your Public Storefront</p>
            <p className="text-lg font-bold text-[#4FBF77]">
              View how customers see your products
            </p>
          </div>

          <CoreButton
            label="Open Store"
            onClick={() => navigate("/shop/merchant_001")}
          />
        </CorePanel>
      </div>

    </div>
  );
}
