import React, { useEffect, useState } from "react";
import { getActiveOffers, registerMerchant } from "@/services/merchantAPI";
import OfferCard from "@/components/ui/OfferCard";
import CreateOfferModal from "./CreateOfferModal";
import { motion } from "framer-motion";

export default function MerchantDashboard() {
  const [offers, setOffers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [merchant, setMerchant] = useState(null);

  async function loadOffers() {
    const data = await getActiveOffers();
    setOffers(data);
  }

  useEffect(() => {
    loadOffers();
  }, []);

  const handleRegister = async () => {
    const name = prompt("Enter merchant name:");
    const category = prompt("Enter merchant category:");
    if (!name || !category) return;
    const res = await registerMerchant(name, category);
    setMerchant(res);
  };

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ðŸª Merchant Dashboard</h1>
        <div className="space-x-3">
          {!merchant && (
            <button
              onClick={handleRegister}
              className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-400"
            >
              Register Merchant
            </button>
          )}
          <button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-400"
          >
            + New Offer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <motion.div key={offer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <OfferCard offer={offer} />
          </motion.div>
        ))}
      </div>

      <CreateOfferModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={loadOffers}
      />
    </div>
  );
}
