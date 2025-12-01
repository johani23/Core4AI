// ============================================================
// 💎 Core4.AI – Unified API Layer (v31 FINAL)
// Supports all Creator + Tribe + Cohesion + Dashboard modules
// ============================================================

const API_BASE = "http://127.0.0.1:8000";
const JSON_HEADERS = { "Content-Type": "application/json" };

/* ------------------------------------------------------------
 * ⚙️ Helpers
 * ------------------------------------------------------------ */
async function handleResponse(res) {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function safeFetch(url, fallback, options = {}) {
  try {
    const res = await fetch(url, options);
    return await handleResponse(res);
  } catch (err) {
    console.warn(`⚠️ API fallback for ${url}:`, err.message);
    return fallback;
  }
}

/* ------------------------------------------------------------
 * 👤 USER PROFILE + SEGMENT
 * ------------------------------------------------------------ */
export async function getUserProfile(userId = 1) {
  const fallback = {
    id: userId,
    name: "Core4 Creator",
    xp: 8600,
    level: 8,
    streak: 7,
    rank: "Top 10%",
  };
  return safeFetch(`${API_BASE}/user/${userId}`, fallback);
}

export async function getUserBadges(userId = 1) {
  const fallback = ["Rising Star", "Trend Setter", "Core4 Icon"];
  return safeFetch(`${API_BASE}/user/${userId}/badges`, fallback);
}

export async function getUserSegment(userId = 1) {
  const fallback = { id: userId, segment: "none" };
  return safeFetch(`${API_BASE}/users/${userId}`, fallback);
}

export async function getUserGroup(userId = 1) {
  const fallback = {
    user: "Anonymous",
    tokens: 0,
    dopamine_score: 0,
    group: "none",
    group_growth: 0,
  };
  return safeFetch(`${API_BASE}/wallet/${userId}`, fallback);
}

export async function assignUserTribe(userId = 1, segmentName = "Default Segment") {
  const payload = { user_id: userId, segment: segmentName };
  const fallback = { success: true, message: `Offline: assigned to ${segmentName}` };
  return safeFetch(`${API_BASE}/user/${userId}/assign_segment`, fallback, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });
}

/* ------------------------------------------------------------
 * 💰 WALLET
 * ------------------------------------------------------------ */
export async function getWallet(userId = 1) {
  const fallback = { balance: 30, symbol: "C4T", dopamine: 50 };
  return safeFetch(`${API_BASE}/wallet/${userId}`, fallback);
}

export async function getUserTokens(userId = 1) {
  const wallet = await getWallet(userId);
  return { remaining: wallet.balance ?? 0, daily_cap: 100 };
}

/* ------------------------------------------------------------
 * 📰 FEED POSTS
 * ------------------------------------------------------------ */
export async function getPosts() {
  const fallback = [
    { id: 1, title: "🔥 First Post!", content: "Testing dopamine sync...", votes: 5 },
    { id: 2, title: "🚀 Market Rising", content: "Vibes are up!", votes: 8 },
  ];
  return safeFetch(`${API_BASE}/posts`, fallback);
}

export async function addPost(title, content) {
  const fd = new FormData();
  fd.append("title", title);
  fd.append("content", content);
  const fallback = { id: Math.random(), title, content, votes: 0 };
  return safeFetch(`${API_BASE}/posts`, fallback, { method: "POST", body: fd });
}

/* ------------------------------------------------------------
 * 👥 GROUPS + TRIBES
 * ------------------------------------------------------------ */
export async function getGroups() {
  const fallback = [
    { id: 1, name: "Vibe Makers", engagement: 84, trend: "UP", summary: "Strong synergy." },
    { id: 2, name: "Adventurers", engagement: 77, trend: "STEADY", summary: "Balanced rhythm." },
    { id: 3, name: "Techies", engagement: 90, trend: "UP", summary: "High tech energy." },
    { id: 4, name: "Rising Icons", engagement: 68, trend: "DOWN", summary: "Needs alignment." },
  ];
  return safeFetch(`${API_BASE}/groups`, fallback);
}

/* ------------------------------------------------------------
 * 📉 GROUP METRICS (UPDATED TO ACCEPT groupId)
 * ------------------------------------------------------------ */
export async function getGroupMetrics(groupId = 1) {
  const fallback = {
    history: [
      { cohesion_score: 82, timestamp: new Date().toISOString() },
      { cohesion_score: 79, timestamp: new Date(Date.now() - 600000).toISOString() },
    ],
  };

  return safeFetch(`${API_BASE}/groups/${groupId}/metrics`, fallback);
}

/* ------------------------------------------------------------
 * 🤝 COHESION ANALYSIS (NEW — REQUIRED BY GroupStats.jsx)
 * ------------------------------------------------------------ */
export async function runCohesionAnalysis(groupId = 1) {
  const fallback = {
    cohesion_score: 78.5,
    balance_index: 0.82,
    resonance_score: 74.3,
    drift_reason: null,
  };

  return safeFetch(`${API_BASE}/groups/${groupId}/cohesion`, fallback);
}

/* ------------------------------------------------------------
 * ⚔️ CHALLENGES + REWARDS
 * ------------------------------------------------------------ */
export async function getChallenges() {
  const fallback = [
    { id: 1, title: "🔥 Viral Surge", description: "Post emotional content.", points: 100 },
    { id: 2, title: "💎 Bull Market Ride", description: "Hold tokens during EMI spike.", points: 80 },
    { id: 3, title: "🎯 Predictor", description: "Predict next EMI movement.", points: 90 },
  ];
  return safeFetch(`${API_BASE}/challenges`, fallback);
}

export async function getRewardHistory(userId = 1) {
  const fallback = [
    { challenge: "🔥 Viral Surge", amount: 10, type: "token", timestamp: new Date().toISOString() },
    { challenge: "🎯 Predictor", amount: 3.5, type: "dopamine", timestamp: new Date(Date.now() - 60000).toISOString() },
  ];
  return safeFetch(`${API_BASE}/rewards/history/${userId}`, fallback);
}

export async function claimReward(userId = 1, points = 100) {
  const fallback = {
    user_id: userId,
    added_tokens: points / 10,
    new_balance: 30 + points / 10,
    dopamine: 52,
    message: `Offline: simulated +${points / 10} C4T`,
  };
  return safeFetch(`${API_BASE}/rewards/claim/${userId}/${points}`, fallback, {
    method: "POST",
    headers: JSON_HEADERS,
  });
}

/* ------------------------------------------------------------
 * 🧠 DOPAMINE ENGINE
 * ------------------------------------------------------------ */
export async function getDopamineProfile(userId = 1) {
  const fallback = { user_id: userId, dopamine: 50, balance: 30 };
  return safeFetch(`${API_BASE}/dopamine/profile/${userId}`, fallback);
}

export async function getDopamineHeatmap() {
  const fallback = [
    { timestamp: new Date().toISOString(), emi: 55, sentiment: 0.1 },
    { timestamp: new Date(Date.now() - 3600000).toISOString(), emi: 52, sentiment: -0.05 },
  ];
  return safeFetch(`${API_BASE}/dopamine/heatmap`, fallback);
}

export async function registerDopamine(userId = 1, intensity = 0.5, eventType = "interaction") {
  const payload = { user_id: userId, intensity, event_type: eventType };
  const fallback = {
    user_id: userId,
    dopamine_value: 50 + intensity * 10,
    message: `Offline: simulated dopamine +${intensity * 10}`,
  };
  return safeFetch(`${API_BASE}/dopamine/register`, fallback, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });
}

/* ------------------------------------------------------------
 * 📈 MARKET + CORE4 TOKENS
 * ------------------------------------------------------------ */
export async function getMarketMood() {
  const fallback = { mood: "neutral", emoji: "🌤", label: "Calm", emi: 50 };
  return safeFetch(`${API_BASE}/market/mood`, fallback);
}

export async function getCore4Tokens() {
  const fallback = [
    { id: 1, name: "Vibe Makers", price: 101.2, change: "+1.2%", engagement: 0.83, dopamine: 0.7, trend: "UP" },
    { id: 2, name: "Adventurers", price: 98.7, change: "-1.3%", engagement: 0.77, dopamine: 0.65, trend: "DOWN" },
    { id: 3, name: "Techies", price: 103.5, change: "+3.5%", engagement: 0.9, dopamine: 0.8, trend: "UP" },
    { id: 4, name: "Rising Icons", price: 99.8, change: "-0.2%", engagement: 0.68, dopamine: 0.6, trend: "STEADY" },
  ];
  return safeFetch(`${API_BASE}/core4/tokens`, fallback);
}

/* ------------------------------------------------------------
 * 🧭 DASHBOARD SUMMARY
 * ------------------------------------------------------------ */
export async function getDashboardSummary() {
  const fallback = {
    avg_cohesion: 84.2,
    momentum_dist: { Rising: 2, Stable: 1, Falling: 0 },
    ai_forecast: "Creative synergy expected to rise by 10% next cycle.",
  };
  return safeFetch(`${API_BASE}/dashboard/summary`, fallback);
}

/* ------------------------------------------------------------
 * 🪞 AWARENESS REFLECTION
 * ------------------------------------------------------------ */
export async function sendReflection(userId = 1, contentId = 1, motive = "curiosity") {
  const payload = { user_id: userId, content_id: contentId, motive };
  const fallback = { gain: 0.2, message: "Offline reflection simulated." };
  return safeFetch(`${API_BASE}/pulse/reflect`, fallback, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });
}

/* ------------------------------------------------------------
 * 🧾 EXPORT MAP
 * ------------------------------------------------------------ */
export default {
  getUserProfile,
  getUserBadges,
  getUserSegment,
  getUserGroup,
  assignUserTribe,
  getWallet,
  getUserTokens,
  getPosts,
  addPost,
  getGroups,
  getGroupMetrics,
  runCohesionAnalysis,
  getChallenges,
  getRewardHistory,
  claimReward,
  getDopamineProfile,
  getDopamineHeatmap,
  registerDopamine,
  getMarketMood,
  getCore4Tokens,
  getDashboardSummary,
  sendReflection,
};

export { API_BASE, JSON_HEADERS, safeFetch };
