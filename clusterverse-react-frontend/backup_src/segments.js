import API_BASE_URL from "./config";

// 🟢 Fetch all Segments
export async function getSegments() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/mvp3/segments`);
    if (!res.ok) throw new Error("Failed to fetch segments");
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching segments:", err);
    return null;
  }
}

// 🟢 Vote for a Segment
export async function voteForSegment(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/mvp3/segments/${id}/vote`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to vote for segment");
    return await res.json();
  } catch (err) {
    console.error(`❌ Error voting for segment ${id}:`, err);
    return null;
  }
}
