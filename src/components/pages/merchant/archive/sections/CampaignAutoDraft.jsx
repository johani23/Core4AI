// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignAutoDraft.jsx (Phase 7 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Auto Draft Generator)
// ============================================================================


export default function CampaignAutoDraft({ product, productIQ }) {
  const [draft, setDraft] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/auto-draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        recommended_price: productIQ.recommended_price,
        feature_value: productIQ.feature_value
      }),
    });

    const data = await res.json();
    setDraft(data);
  };

  useEffect(() => {
    if (product && productIQ) load();
  }, [product, productIQ]);

  if (!draft)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-gray-400 text-center">... ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â¥Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â Campaign Auto-Draft
      </h2>

      <div className="space-y-4">

        <div className="p-4 bg-gray-50 border rounded">
          <h3 className="font-bold mb-2">ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ Script</h3>
          <ul className="list-disc pl-6 space-y-1">
            {draft.script.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-gray-50 border rounded">
          <h3 className="font-bold mb-2">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤ Hooks</h3>
          <ul className="list-disc pl-6 space-y-1">
            {draft.hooks.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-green-50 border rounded">
          <h3 className="font-bold mb-2">ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Offer</h3>
          <p className="font-bold">{draft.offer.headline}</p>
          <p>{draft.offer.sub}</p>
          <p className="text-green-700 font-semibold mt-1">
            {draft.offer.cta}
          </p>
        </div>

      </div>
    </div>
  );
}


