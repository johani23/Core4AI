// ============================================================
// 💎 Core4.AI – MVP-27 Unified API Layer (Tribe + Market Pulse)
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
 * 👤 USER PROFILE + TRIBE
 * ------------------------------------------------------------ */
export async function getUserProfile(userId = 1) {
  const fallback = { id: userId, name: "Core4 Creator", xp: 8600, level: 8, streak: 7, rank: "Top 10%" };
  return safeFetch(`${API_BASE}/user/${userId}`, fallback);
}

export async function getUserBadges(userId = 1) {
  const fallback = ["Rising Star", "Trend Setter", "Core4 Icon"];
  return safeFetch(`${API_BASE}/user/${userId}/badges`, fallback);
}

export async function getUserTribe(userId = 1) {
  const fallback = { user_id: userId, tribe: "none" };
  return safeFetch(`${API_BASE}/user/${userId}/tribe`, fallback);
}

export async function assignUserTribe(userId = 1, tribeName = "Default Tribe") {
  const payload = { user_id: userId, tribe: tribeName };
  const fallback = { success: true, message: `Offline: assigned to ${tribeName}` };
  return safeFetch(`${API_BASE}/user/${userId}/assign_tribe`, fallback, {
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
 * 📰 FEED
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
 * 👥 GROUPS + LEADERBOARD + CLUSTERS
 * ------------------------------------------------------------ */
export async function getGroups() {
  const fallback = [
    { id: 1, name: "Vibe Makers", engagement: 84, trend: "UP", description: "Strong engagement among members." },
    { id: 2, name: "Adventurers", engagement: 77, trend: "STEADY", description: "Balanced performance and energy." },
    { id: 3, name: "Techies", engagement: 90, trend: "UP", description: "High creativity and tech synergy." },
    { id: 4, name: "Rising Icons", engagement: 68, trend: "DOWN", description: "Needs better rhythm and alignment." },
  ];
  return safeFetch(`${API_BASE}/groups`, fallback);
}

export async function getLeaderboardData() {
  const fallback = [
    { rank: 1, group: "Visionary Squad", xp: 3200, growth: "+12%", momentum: "Rising" },
    { rank: 2, group: "Neural Nomads", xp: 2900, growth: "+10%", momentum: "Climbing" },
    { rank: 3, group: "Data Dreamers", xp: 2500, growth: "+8%", momentum: "Stable" },
  ];
  return safeFetch(`${API_BASE}/leaderboard`, fallback);
}

export async function getGroupMetrics() {
  const fallback = [
    { cluster: "Vibe Makers", cohesion: 82, dopamine: 70, growth: 11, label: "Climbing" },
    { cluster: "Neural Nomads", cohesion: 75, dopamine: 64, growth: 9, label: "Stable" },
    { cluster: "Data Dreamers", cohesion: 88, dopamine: 72, growth: 14, label: "Rising" },
  ];
  return safeFetch(`${API_BASE}/cluster/metrics`, fallback);
}

/* ------------------------------------------------------------
 * ⚔️ CHALLENGES + REWARDS
 * ------------------------------------------------------------ */
export async function getChallenges() {
  const fallback = [
    { id: 1, title: "🔥 Viral Surge", description: "Post highly emotional content.", points: 100 },
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
  return safeFetch(`${API_BASE}/rewards/claim/${userId}/${points}`, fallback, { method: "POST" });
}

export async function evaluateRewards(userId = 1) {
  const history = await getRewardHistory(userId);
  const total = history.reduce((sum, r) => sum + (r.amount || 0), 0);
  return { user_id: userId, total_rewards: total, last_activity: history[0]?.timestamp || new Date().toISOString() };
}

export async function triggerRewardEvaluation(userId = 1) {
  return evaluateRewards(userId);
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
 * 📈 MARKET (Legacy)
 * ------------------------------------------------------------ */
export async function getMarketMood() {
  const fallback = { mood: "neutral", emoji: "🌤", label: "Calm", emi: 50 };
  return safeFetch(`${API_BASE}/market/mood`, fallback);
}

export async function getMarketTrades() {
  const fallback = [
    { price: 3.42, qty: 15, t: new Date().toISOString() },
    { price: 3.38, qty: 25, t: new Date(Date.now() - 300000).toISOString() },
  ];
  return safeFetch(`${API_BASE}/tokens/trades`, fallback);
}

export async function getMarketMessages() {
  const fallback = { message: "🌤 Mood steady — post uplifting content!", timestamp: new Date().toISOString() };
  return safeFetch(`${API_BASE}/market/messages`, fallback);
}

/* ------------------------------------------------------------
 * 💹 MARKET PULSE + TRIBE COMPETITION (MVP-27)
 * ------------------------------------------------------------ */
export async function getMarketPulse() {
  const fallback = [];
  return safeFetch(`${API_BASE}/market/pulse`, fallback);
}

export async function getMarketNews() {
  const fallback = [];
  return safeFetch(`${API_BASE}/market/news`, fallback);
}

export async function getTribeLeaderboard() {
  const fallback = [];
  return safeFetch(`${API_BASE}/tribes/leaderboard`, fallback);
}

export async function refreshMarket() {
  const fallback = { status: "offline refresh" };
  return safeFetch(`${API_BASE}/market/refresh`, fallback, {
    method: "POST",
    headers: JSON_HEADERS,
  });
}

/* ------------------------------------------------------------
 * 🧭 DASHBOARD
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
 * 🧾 DEFAULT EXPORT
 * ------------------------------------------------------------ */
export default {
  getUserProfile,
  getUserBadges,
  getUserTribe,
  assignUserTribe,
  getWallet,
  getUserTokens,
  getPosts,
  addPost,
  getGroups,
  getLeaderboardData,
  getGroupMetrics,
  getChallenges,
  getRewardHistory,
  claimReward,
  evaluateRewards,
  triggerRewardEvaluation,
  getDopamineProfile,
  getDopamineHeatmap,
  registerDopamine,
  getMarketMood,
  getMarketTrades,
  getMarketMessages,
  getDashboardSummary,
  // 🆕 MVP-27
  getMarketPulse,
  getMarketNews,
  getTribeLeaderboard,
  refreshMarket,
};

export { API_BASE, JSON_HEADERS, safeFetch };
