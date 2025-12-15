// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ MerchantReport.jsx (Phase 10 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ AI Final Report)
// ============================================================================


export default function MerchantReport({ product, productIQ, merchantIntel, readiness }) {
  const [jsonData, setJsonData] = useState(null);
  const [pdfLink, setPdfLink] = useState("");

  const sendJson = async () => {
    const res = await fetch("/api/merchant/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
        fair_price: productIQ.fair_price,
        premium_price: productIQ.premium_price,
        feature_value: productIQ.feature_value,
        intel_score: merchantIntel.feature_advantage_score,
        readiness: readiness
      })
    });

    const data = await res.json();
    setJsonData(data);
  };

  const getPdf = async () => {
    const res = await fetch("/api/merchant/report/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
        fair_price: productIQ.fair_price,
        premium_price: productIQ.premium_price,
        feature_value: productIQ.feature_value,
        intel_score: merchantIntel.feature_advantage_score,
        readiness: readiness
      })
    });

    const data = await res.json();
    setPdfLink(data.file);
  };

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾ Final AI Report
      </h2>

      <button
        onClick={sendJson}
        className="w-full bg-green-700 text-white py-3 rounded-lg mb-3"
      >
        ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â Generate JSON Report
      </button>

      {jsonData && (
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}

      <button
        onClick={getPdf}
        className="w-full bg-blue-700 text-white py-3 rounded-lg mt-4"
      >
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¥ Generate PDF Report
      </button>

      {pdfLink && (
        <div className="mt-3 text-center text-green-800 font-bold">
          PDF Ready: {pdfLink}
        </div>
      )}
    </div>
  );
}


