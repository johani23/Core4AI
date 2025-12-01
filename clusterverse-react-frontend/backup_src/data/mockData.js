/**
 * Core4.AI – MVP 10 Mock Data
 * Provides base data for local simulation (used by dataSync.js)
 */

export const mockGroups = [
  {
    id: 1,
    name: "AI Innovators",
    xp: 1250,
    growth: "+14%",
    members: 4,
    ai: {
      momentum: "Rising 🚀",
      forecast: "17.5% expected growth next cycle",
      insight: "Leading cluster — driving innovation trends.",
    },
  },
  {
    id: 2,
    name: "Content Creators",
    xp: 950,
    growth: "+9%",
    members: 5,
    ai: {
      momentum: "Stable 🌕",
      forecast: "10.2% expected growth next cycle",
      insight: "Maintaining steady performance — consistent creators.",
    },
  },
  {
    id: 3,
    name: "Fashion Visionaries",
    xp: 760,
    growth: "+6%",
    members: 3,
    ai: {
      momentum: "Cooling 💤",
      forecast: "5.1% expected growth next cycle",
      insight: "Needs renewed engagement and visual creativity.",
    },
  },
];

export const mockIndividuals = [
  {
    id: 1,
    name: "Sama",
    xp: 420,
    posts: 5,
    nominations: 2,
    badges: ["Rising Star ⭐", "Trend Setter 🚀"],
    influence: {
      baseScore: 72,
      tier: "Rising 🔥",
      color: "purple",
    },
  },
  {
    id: 2,
    name: "Noor",
    xp: 230,
    posts: 3,
    nominations: 1,
    badges: ["Creative Mind 💡"],
    influence: {
      baseScore: 55,
      tier: "Stable 🌕",
      color: "yellow",
    },
  },
];

export const mockPosts = [
  {
    id: 1001,
    userId: 1,
    text: "AI is changing the way we create and connect 💡",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 1002,
    userId: 2,
    text: "Creativity without fear of failure is where true innovation begins 🔥",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 1003,
    userId: 1,
    text: "Design is not what it looks like, it’s how it works.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
];

export const mockNominations = [
  {
    postId: 1001,
    groupId: 1,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    postId: 1002,
    groupId: 2,
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
];

/**
 * Default structure used by dataSync.js if localStorage is empty.
 */
export const mockData = {
  groups: mockGroups,
  posts: mockPosts,
  nominations: mockNominations,
  individuals: mockIndividuals,
};
