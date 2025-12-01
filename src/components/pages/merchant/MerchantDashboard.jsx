// ============================================================================
// ðŸ’š Core4.AI â€“ MerchantDashboard.jsx (v9 Final)
// ----------------------------------------------------------------------------
// Main hub â†’ quick access to Pricing, Products, MIT, Campaigns, Earnings
// ============================================================================

import React from "react";
import { Link } from "react-router-dom";
import {
  ChartBarIcon,
  TagIcon,
  CubeIcon,
  SparklesIcon,
  BanknotesIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

const Card = ({ icon: Icon, title, desc, to }) => (
  <Link
    to={to}
    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
  >
    <div className="flex items-center space-x-3 mb-3">
      <div className="bg-gray-900 text-white p-3 rounded-lg">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>

    <p className="text-gray-500 text-sm">{desc}</p>
  </Link>
);

export default function MerchantDashboard() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Merchant Hub</h1>
        <p className="text-gray-500 mt-1">
          Your full commerce command center powered by Core4.AI Intelligence.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        <Card
          icon={CubeIcon}
          title="Product Center"
          desc="Add, manage, and optimize all your products."
          to="/merchant/products"
        />

        <Card
          icon={TagIcon}
          title="Pricing Intelligence"
          desc="Access the MIT engine, EVC, elasticity, and demand curves."
          to="/merchant/pricing"
        />

        <Card
          icon={SparklesIcon}
          title="Creative Studio"
          desc="Auto-generate ads, angles, and storyboards using AI."
          to="/merchant/creative"
        />

        <Card
          icon={MegaphoneIcon}
          title="Campaign Builder"
          desc="Build AI-optimized campaigns and track performance."
          to="/merchant/campaigns"
        />

        <Card
          icon={BanknotesIcon}
          title="Earnings Center"
          desc="Monitor influencer payouts, commissions, and ROI."
          to="/merchant/earnings"
        />

        <Card
          icon={ChartBarIcon}
          title="Analytics Center"
          desc="Analyze revenue, cohorts, funnels, and traffic."
          to="/merchant/analytics"
        />

      </div>
    </div>
  );
}
