// src/state/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  // Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…
  user: {
    name: "Guest",
    xp: 0,
    level: 1,
    badges: []
  },

  // ØªØ­Ø¯ÙŠØ« Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø¨Ø§Ù„ÙƒØ§Ù…Ù„
  setUser: (newUser) => set({ user: newUser }),

  // Ø¥Ø¶Ø§ÙØ© XP ÙˆØªØ­Ø¯ÙŠØ« Ø§Ù„Ù…Ø³ØªÙˆÙ‰
  addXP: (amount) =>
    set((state) => {
      const newXP = state.user.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return {
        user: {
          ...state.user,
          xp: newXP,
          level: newLevel,
        },
      };
    }),

  // Ø¥Ø¶Ø§ÙØ© Badge Ø¬Ø¯ÙŠØ¯
  addBadge: (badge) =>
    set((state) => ({
      user: {
        ...state.user,
        badges: [...state.user.badges, badge],
      },
    })),
}));
