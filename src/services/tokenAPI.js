// ============================================================
// Ã°Å¸â€™Å½ Core4.AI Token API Client Ã¢â‚¬â€œ MVP-24.8 (Final Sync Edition)
// Emotion-Driven Market + Wallet + Trade Engine Compatibility
// ============================================================

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ------------------------------------------------------------
// Ã°Å¸Âªâ„¢ USER WALLET
// ------------------------------------------------------------
export async function getWallet(userId = 1) {
  try {
    const res = await axios.get(`${API_BASE}/wallet/${userId}`);
    return res.data; // { balance, symbol, dopamine }
  } catch (err) {
    console.error("Ã¢ÂÅ’ Error fetching wallet:", err.message);
    return { balance: 0, symbol: "C4T", dopamine: 50 };
  }
}

// ------------------------------------------------------------
// Ã°Å¸â€œÅ  MARKET MOOD
// ------------------------------------------------------------
export async function getMarketMood() {
  try {
    const res = await axios.get(`${API_BASE}/market/mood`);
    return res.data; // { mood, emoji, label, emi }
  } catch (err) {
    console.warn("Ã¢Å¡Â Ã¯Â¸Â Market mood fallback:", err.message);
    return { mood: "neutral", emoji: "Ã°Å¸Å’Â¤", label: "Calm", emi: 50 };
  }
}

// ------------------------------------------------------------
// Ã°Å¸â€œË† MARKET SUMMARY (builds from mood + trades)
// ------------------------------------------------------------
export async function getMarketSummary() {
  try {
    const [mood, trades] = await Promise.all([getMarketMood(), getRecentTrades()]);
    const lastTrade = trades?.[0]?.price || 3.42;
    const volatility =
      trades.length > 1
        ? ((Math.max(...trades.map((t) => t.price)) -
            Math.min(...trades.map((t) => t.price))) /
            lastTrade) *
          10
        : 0.1;
    return {
      last_trade: lastTrade,
      highest_bid: Math.max(...trades.map((t) => t.price), 3.42),
      lowest_ask: Math.min(...trades.map((t) => t.price), 3.42),
      volume: trades.length,
      volatility: volatility.toFixed(2),
      mood: mood.mood,
      emoji: mood.emoji,
      label: mood.label,
      emi: mood.emi,
    };
  } catch (err) {
    console.warn("Ã¢Å¡Â Ã¯Â¸Â Market summary fallback:", err.message);
    return {
      last_trade: 3.42,
      highest_bid: 3.44,
      lowest_ask: 3.40,
      volume: 5,
      volatility: 0.18,
      mood: "neutral",
      emoji: "Ã°Å¸Å’Â¤",
      label: "Calm",
      emi: 50,
    };
  }
}

// ------------------------------------------------------------
// Ã°Å¸â€™Â¬ MARKET MESSAGE STREAM
// ------------------------------------------------------------
export async function getMarketMessages() {
  try {
    const res = await axios.get(`${API_BASE}/market/messages`);
    return res.data; // { message, timestamp }
  } catch (err) {
    console.warn("Ã¢Å¡Â Ã¯Â¸Â Market message fallback:", err.message);
    return { message: "Ã°Å¸Å’Â¤ Calm day Ã¢â‚¬â€ keep posting meaningful content!", timestamp: new Date().toISOString() };
  }
}

// ------------------------------------------------------------
// Ã°Å¸Âªâ„¢ USER TOKENS (wallet alias)
// ------------------------------------------------------------
export async function getUserTokens(userId = 1) {
  const wallet = await getWallet(userId);
  return {
    user_id: userId,
    tokens: [
      {
        symbol: wallet.symbol,
        balance: wallet.balance,
        market_value: 3.42,
        last_update: new Date().toISOString(),
      },
    ],
  };
}

// ------------------------------------------------------------
// Ã¢Å¡â„¢Ã¯Â¸Â INTERNAL EMOTION UPDATE (optional hidden sync)
// ------------------------------------------------------------
export async function internalEmotionUpdate(userId = 1, content = "") {
  try {
    await axios.post(`${API_BASE}/internal/emotion/update`, {
      user_id: userId,
      content,
    });
  } catch (err) {
    console.warn("Ã¢Å¡â„¢Ã¯Â¸Â internal emotion update skipped:", err.message);
  }
}

// ------------------------------------------------------------
// Ã°Å¸â€œÅ  RECENT TRADES (live from backend)
// ------------------------------------------------------------
export async function getRecentTrades() {
  try {
    const res = await axios.get(`${API_BASE}/tokens/trades`);
    return res.data; // [{ price, qty, t }]
  } catch (err) {
    console.error("Ã¢ÂÅ’ Error fetching trades:", err.message);
    return [
      { price: 3.42, qty: 15, t: new Date().toISOString() },
      { price: 3.39, qty: 22, t: new Date(Date.now() - 60000).toISOString() },
    ];
  }
}

// ------------------------------------------------------------
// Ã°Å¸â€™Â° PLACE ORDER (placeholder for MVP-25 token trading)
// ------------------------------------------------------------
export async function placeOrder(userId, side, price, quantity) {
  try {
    const res = await axios.post(`${API_BASE}/tokens/orders`, {
      user_id: userId,
      side,
      price,
      quantity,
    });
    return res.data;
  } catch (err) {
    console.error("Ã¢ÂÅ’ Error placing order:", err.message);
    return { success: false, message: "Order simulation mode active." };
  }
}

// ------------------------------------------------------------
// Ã°Å¸Â§Â¾ CREATOR LEADERBOARD (mock for MVP-25)
// ------------------------------------------------------------
export async function getCreatorLeaderboard() {
  return [
    { id: 1, name: "Sama", segment: "Adventurers", score: 96 },
    { id: 2, name: "Lina", segment: "Techies", score: 92 },
    { id: 3, name: "Noura", segment: "Rising Icons", score: 87 },
    { id: 4, name: "Fahad", segment: "Vibe Makers", score: 84 },
  ];
}

