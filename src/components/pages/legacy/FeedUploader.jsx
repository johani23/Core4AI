// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ FeedUploader.jsx (v0.1 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œMultimodal Upload TestÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Uploads image/video ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ calls /api/content/score/image or /video
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays returned AI metrics in same style
// ============================================================


const API_BASE = "http://127.0.0.1:8000";

export default function FeedUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [type, setType] = useState("image");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const endpoint =
      type === "video"
        ? `${API_BASE}/api/content/score/video`
        : `${API_BASE}/api/content/score/image`;

    const res = await fetch(endpoint, { method: "POST", body: formData });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã…Â½Ã…Â¾ Multimodal Feed Uploader</h1>

      <div className="mb-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      <input
        type="file"
        accept={type === "image" ? "image/*" : "video/*"}
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`px-5 py-2 rounded-lg font-semibold ${
          loading ? "bg-zinc-700 text-gray-400" : "bg-purple-700 hover:bg-purple-600"
        }`}
      >
        {loading ? "Scoring..." : "Upload & Analyze"}
      </button>

      {result && (
        <div className="mt-6 bg-zinc-900 p-4 rounded-xl max-w-md">
          <h2 className="text-lg font-semibold mb-2 text-purple-400">
            {result.type.toUpperCase()} Results
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {result.insight && (
              <div>ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡ Insight: <span className="text-blue-400">{result.insight}%</span></div>
            )}
            <div>ÃƒÂ¢Ã…â€œÃ‚Â¨ Originality: <span className="text-green-400">{result.originality}%</span></div>
            <div>ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Engagement: <span className="text-yellow-400">{result.engagement}%</span></div>
            <div>ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Credibility: <span className="text-purple-400">{result.credibility}%</span></div>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Score: {(result.score * 100).toFixed(1)}% ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Dopamine: {result.dopamine}
          </p>
        </div>
      )}
    </div>
  );
}


