// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MerchantRNDPanel.jsx
// ============================================================


export default function MerchantRNDPanel({ featureId }) {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/rnd/feature/${featureId}/pricing`)
      .then(res => res.json())
      .then(setData);
  }, [featureId]);

  if (!data) return <div>Loading...</div>;

  if (data.status === "insufficient_data")
    return <div className="text-red-500">{data.message}</div>;

  return (
    <div className="p-6 bg-white rounded shadow">

      <h2 className="text-xl font-bold mb-3">Pricing Insights</h2>

      <p><strong>Responses:</strong> {data.sample_size}</p>
      <p><strong>Median WTP:</strong> {data.median_wtp}</p>
      <p><strong>Average WTP:</strong> {data.avg_wtp}</p>
      <p><strong>Elasticity:</strong> {data.elasticity_score}</p>

      <div className="mt-4 text-lg font-bold text-green-700">
        Recommended Action: {data.recommended_price_action}
      </div>

    </div>
  );
}


