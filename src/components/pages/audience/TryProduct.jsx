import React, { useState } from "react";
import CoreHeader from "@/components/ui/CoreHeader";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import { useNavigate } from "react-router-dom";

export default function TryProduct() {
  const [product, setProduct] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">
      <CoreHeader
        title="Try a Product"
        subtitle="Type the product name to begin your review journey."
        icon="ðŸ›ï¸"
      />

      <CorePanel className="max-w-2xl mx-auto">
        <input
          className="w-full p-4 bg-[#11161A] border border-[#4FBF77]/30 rounded-xl text-white mb-4"
          placeholder="Product name..."
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <CoreButton
          label="Continue â†’ Review"
          onClick={() => navigate("/audience/review", { state: { product } })}
        />
      </CorePanel>
    </div>
  );
}
