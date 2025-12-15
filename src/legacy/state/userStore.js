// src/state/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  // Ã˜Â¨Ã™Å Ã˜Â§Ã™â€ Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã™â€¦
  user: {
    name: "Guest",
    xp: 0,
    level: 1,
    badges: []
  },

  // Ã˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â« Ã˜Â¨Ã™Å Ã˜Â§Ã™â€ Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã™â€¦ Ã˜Â¨Ã˜Â§Ã™â€žÃ™Æ’Ã˜Â§Ã™â€¦Ã™â€ž
  setUser: (newUser) => set({ user: newUser }),

  // Ã˜Â¥Ã˜Â¶Ã˜Â§Ã™ÂÃ˜Â© XP Ã™Ë†Ã˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â« Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â³Ã˜ÂªÃ™Ë†Ã™â€°
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

  // Ã˜Â¥Ã˜Â¶Ã˜Â§Ã™ÂÃ˜Â© Badge Ã˜Â¬Ã˜Â¯Ã™Å Ã˜Â¯
  addBadge: (badge) =>
    set((state) => ({
      user: {
        ...state.user,
        badges: [...state.user.badges, badge],
      },
    })),
}));

