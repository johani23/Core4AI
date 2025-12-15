// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignToneAdvisor.jsx (Phase 23 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Tone & Messaging Advisor)
// ============================================================================


export default function CampaignToneAdvisor({
  product,
  productIQ,
  audienceFit,
  readiness
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/tone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        feature_value: productIQ.feature_value,
        audience_fit: audienceFit,
        readiness: readiness
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (
      product &&
      productIQ &&
      audienceFit !== null &&
      readiness !== null
    )
      load();
  }, [product, productIQ, audienceFit, readiness]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-gray-400 text-center">...Generating Tone</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â Messaging Tone & Suggested Copy
      </h2>

      <p className="text-lg font-bold text-gray-800 mb-3">
        Tone: {data.tone}
      </p>

      <div className="space-y-2 p-4 bg-gray-50 border rounded">
        {data.messages.map((m, i) => (
          <p key={i} className="text-gray-700">
            ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {m}
          </p>
        ))}
      </div>
    </div>
  );
}


