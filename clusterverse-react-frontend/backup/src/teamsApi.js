const API_BASE = "http://localhost:8000"; // adjust if backend on another domain/port

// ==============================
// 🟢 Teams
// ==============================
export async function createTeams(population, numTeams = 2) {
  try {
    const response = await fetch(`${API_BASE}/api/mvp3/create_teams`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ population, num_teams: numTeams }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error calling createTeams API:", err);
    return null;
  }
}

export async function voteForIdea(teamId, ideaId) {
  try {
    const response = await fetch(`${API_BASE}/api/mvp3/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team_id: teamId, idea_id: ideaId }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error calling vote API:", err);
    return null;
  }
}

// ==============================
// 🟢 Segments
// ==============================
export async function getSegments() {
  try {
    const response = await fetch(`${API_BASE}/api/mvp3/segments`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching segments:", err);
    return null;
  }
}

export async function voteForSegment(contentId) {
  try {
    const response = await fetch(`${API_BASE}/api/mvp3/segments/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content_id: contentId }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error calling segment vote API:", err);
    return null;
  }
}

// ==============================
// 🟢 Challenges (MVP3.3)
// ==============================
export async function getChallenges() {
  try {
    const response = await fetch(`${API_BASE}/api/mvp3/challenges`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching challenges:", err);
    return [];
  }
}

export async function claimChallenge(username, challengeId) {
  try {
    const response = await fetch(`${API_BASE}/api/mvp3/challenges/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, challenge_id: challengeId }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error claiming challenge:", err);
    return null;
  }
}

// ==============================
// 🟢 Daily Pulse (MVP3.3)
// ==============================
export async function submitPulse(username, text) {
  try {
    const response = await fetch(`${API_BASE}/api/mvp3/pulse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, text }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error submitting pulse:", err);
    return null;
  }
}

// ==============================
// 🟢 Leaderboard + Users
// ==============================
export async function getLeaderboard() {
  try {
    const response = await fetch(`${API_BASE}/leaderboard`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    return [];
  }
}

export async function getUser(username) {
  try {
    const response = await fetch(`${API_BASE}/users/${username}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

export async function updateStreak(username) {
  try {
    const response = await fetch(`${API_BASE}/streak/update?username=${username}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error updating streak:", err);
    return null;
  }
}
