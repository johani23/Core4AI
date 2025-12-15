import React, { useState } from "react";
import { createGroup } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateGroup() {
  const [memberIds, setMemberIds] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const ids = memberIds
        .split(",")
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id));

      if (ids.length === 0) {
        setMessage("âš ï¸ Please enter at least one valid user ID.");
        setLoading(false);
        return;
      }

      const newGroup = await createGroup(ids);
      setMessage(`âœ… Group ${newGroup.id} created successfully!`);

      // Ø¨Ø¹Ø¯ 1.5 Ø«Ø§Ù†ÙŠØ© Ø±ÙˆØ­ Ù„ØµÙØ­Ø© Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§Øª
      setTimeout(() => {
        navigate("/groups");
      }, 1500);
    } catch (err) {
      console.error("createGroup failed", err);
      setMessage("âŒ Failed to create group.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">âž• Create New Group</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">
            Member IDs (comma-separated):
          </label>
          <input
            type="text"
            value={memberIds}
            onChange={(e) => setMemberIds(e.target.value)}
            placeholder="e.g. 1, 2, 3"
            className="w-full border rounded p-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}

export default CreateGroup;
