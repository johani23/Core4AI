// ============================================================
// ðŸ‡¸ðŸ‡¦ Saudi Checkout Page
// ============================================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/product/${productId}`).then((res) => {
      setProduct(res.data);
    });
  }, [productId]);

  if (!product) return <div className="p-6">Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...</div>;

  const startPayment = async () => {
    const res = await axios.post("/api/checkout/start", {
      product_id: productId,
      buyer_id: "buyer-001",
    });

    navigate(`/payment/${res.data.session_id}`);
  };

  return (
    <div className="bg-[#F4EFE7] min-h-screen py-14">

      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-10">

        <img
          src={product.image}
          className="w-full rounded-xl h-64 object-cover mb-6"
        />

        <h2 className="text-3xl font-extrabold text-[#004A26]" style={{ fontFamily: "Tajawal" }}>
          {product.name}
        </h2>

        <p className="text-gray-600 mt-3">{product.description}</p>

        <p className="text-[#006C35] text-3xl font-extrabold mt-6">
          {product.price} Ø±ÙŠØ§Ù„
        </p>

        <button
          onClick={startPayment}
          className="w-full mt-8 py-4 bg-[#006C35] rounded-xl text-white text-xl font-bold hover:bg-green-700"
          style={{ fontFamily: "Tajawal" }}
        >
          Ø¥ØªÙ…Ø§Ù… Ø§Ù„Ø¯ÙØ¹
        </button>

      </div>

    </div>
  );
}
