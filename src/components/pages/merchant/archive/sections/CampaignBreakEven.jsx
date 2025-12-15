// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignBreakEven.jsx (Phase 19 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Break-Even Calculator)
// ============================================================================


export default function CampaignBreakEven({ product, budget }) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/breakeven", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_price: product.price,
        budget: budget
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (product && budget !== null) load();
  }, [product, budget]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Calculating Break-Even</p>
      </div>
    );

  if (data.break_even_units === null)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-500">ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Cannot calculate break-even.</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â° Break-Even Point
      </h2>

      <div className="space-y-4 text-gray-800">

        <p>
          <strong>Units Needed:</strong> {data.break_even_units} Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©
        </p>

        <div className="p-4 bg-green-50 border rounded text-center">
          <p className="text-gray-600 text-sm">
            Number of units needed to recover the budget.
          </p>
        </div>

      </div>

    </div>
  );
}


