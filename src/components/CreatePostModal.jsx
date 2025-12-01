// ============================================================
// ðŸš€ CreatePostModal.jsx (v4.0 â€œTribe Collaboration Editionâ€)
// ------------------------------------------------------------
// âœ… Adapts to role (buyer / creator)
// âœ… Context-aware UX for Feed, Offers, Promote, Collab
// âœ… Tribe selection + collaborator invites with commission splits
// ============================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { usePosts } from "@context/PostsContext";

export default function CreatePostModal({ open, onClose, context = "feed", userRole }) {
  const { addPost } = usePosts();

  const [form, setForm] = useState({
    content: "",
    offerName: "",
    price: "",
    discount: "",
    commission: "",
    link: "",
    tribe: "",
    collaborators: [],
  });

  if (!open) return null;

  const set = (field, value) => setForm({ ...form, [field]: value });

  const titles = {
    feed: "âœï¸ Share Something Worth Noticing",
    offers: "ðŸ›ï¸ Add Your Product Offer",
    promote: "ðŸš€ Promote and Collaborate",
    collab: "ðŸ¤ Launch a Collaboration",
  };

  const hints = {
    feed: "Tell your story or start a trend today.",
    offers: "List a product with price & commission details.",
    promote: "Invite tribe members to co-promote and share rewards.",
    collab: "Start a joint campaign with creators or brands.",
  };

  // ----------------------------
  // ðŸ§© Save Post
  // ----------------------------
  const handleSubmit = () => {
    if (!form.content && !form.offerName) return alert("Please fill in the main content!");

    const payload = {
      id: Date.now(),
      ...form,
      mode: context,
      role: userRole,
      likes: 0,
      comments: [],
      invitationsSent: form.collaborators?.length > 0,
    };

    addPost(payload);
    onClose();
  };

  // ----------------------------
  // ðŸ§  Mock Tribe Members
  // (Later can be fetched dynamically)
  // ----------------------------
  const tribeMembers = [
    { id: "m1", name: "Sama" },
    { id: "m2", name: "Noor" },
    { id: "m3", name: "Loulia" },
    { id: "m4", name: "Rayan" },
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-[#111827] border border-gray-700 rounded-2xl p-6 w-[90%] sm:w-[480px] text-white relative shadow-2xl"
      >
        {/* âœ–ï¸ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-purple-400 mb-1">{titles[context]}</h2>
        <p className="text-sm text-gray-400 mb-4">{hints[context]}</p>

        {/* ---------------------------- */}
        {/* FEED MODE */}
        {/* ---------------------------- */}
        {context === "feed" && (
          <textarea
            rows={3}
            placeholder="Share your thoughts or start a trend..."
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            className="inputBox"
          />
        )}

        {/* ---------------------------- */}
        {/* OFFERS MODE */}
        {/* ---------------------------- */}
        {context === "offers" && (
          <>
            <input
              placeholder="Product Name"
              value={form.offerName}
              onChange={(e) => set("offerName", e.target.value)}
              className="inputBox"
            />
            <input
              type="number"
              placeholder="Price ($)"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className="inputBox"
            />
            <input
              type="number"
              placeholder="Discount (%)"
              value={form.discount}
              onChange={(e) => set("discount", e.target.value)}
              className="inputBox"
            />
            <input
              type="number"
              placeholder="Commission (%)"
              value={form.commission}
              onChange={(e) => set("commission", e.target.value)}
              className="inputBox"
            />
          </>
        )}

        {/* ---------------------------- */}
        {/* PROMOTE MODE */}
        {/* ---------------------------- */}
        {context === "promote" && (
          <>
            {/* Tribe Selector */}
            <select
              value={form.tribe}
              onChange={(e) => set("tribe", e.target.value)}
              className="inputBox"
            >
              <option value="">Go Solo (no tribe)</option>
              <option value="Fashion Tribe">Fashion Tribe</option>
              <option value="Event Tribe">Event Tribe</option>
              <option value="Tech Tribe">Tech Tribe</option>
              <option value="Health Tribe">Health Tribe</option>
            </select>

            <input
              placeholder="Offer or Product Name"
              value={form.offerName}
              onChange={(e) => set("offerName", e.target.value)}
              className="inputBox"
            />
            <input
              placeholder="Promo Video Link or URL"
              value={form.link}
              onChange={(e) => set("link", e.target.value)}
              className="inputBox"
            />

            {/* Show Members Only if Tribe Selected */}
            {form.tribe && (
              <div className="mt-3 bg-black/30 border border-gray-700 rounded-lg p-3">
                <p className="text-sm text-gray-300 mb-2 font-medium">
                  Select members from <span className="text-purple-400">{form.tribe}</span> to collaborate:
                </p>

                {tribeMembers.map((m) => (
                  <div key={m.id} className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        className="accent-purple-500"
                        checked={(form.collaborators || []).some((c) => c.id === m.id)}
                        onChange={(e) => {
                          let updated = form.collaborators || [];
                          if (e.target.checked)
                            updated.push({ ...m, commission: 5 });
                          else updated = updated.filter((c) => c.id !== m.id);
                          set("collaborators", updated);
                        }}
                      />
                      {m.name}
                    </label>

                    {(form.collaborators || []).some((c) => c.id === m.id) && (
                      <input
                        type="number"
                        value={
                          form.collaborators.find((c) => c.id === m.id)?.commission || ""
                        }
                        onChange={(e) => {
                          const val = parseFloat(e.target.value || 0);
                          set(
                            "collaborators",
                            (form.collaborators || []).map((c) =>
                              c.id === m.id ? { ...c, commission: val } : c
                            )
                          );
                        }}
                        className="w-16 bg-black/50 border border-gray-700 text-xs text-center rounded-md text-white"
                        placeholder="%"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ---------------------------- */}
        {/* COLLAB MODE */}
        {/* ---------------------------- */}
        {context === "collab" && (
          <>
            <input
              placeholder="Campaign Title"
              value={form.offerName}
              onChange={(e) => set("offerName", e.target.value)}
              className="inputBox"
            />
            <textarea
              rows={3}
              placeholder="Describe your collaboration idea..."
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              className="inputBox"
            />
          </>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold px-6 py-2 rounded-md hover:opacity-90 transition mt-2"
        >
          {context === "offers" && "ðŸ›ï¸ Add Offer"}
          {context === "feed" && "âœï¸ Post Now"}
          {context === "promote" && "ðŸš€ Send Invites & Publish"}
          {context === "collab" && "ðŸ¤ Launch Campaign"}
        </button>
      </motion.div>
    </motion.div>
  );
}

// ------------------------------------------------------------
// ðŸŽ¨ Shared Input Style Helper
// ------------------------------------------------------------
const inputBox =
  "w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-sm text-white mb-3 focus:outline-none focus:ring-1 focus:ring-purple-500";
