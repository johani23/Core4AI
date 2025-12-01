// src/state/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  // بيانات المستخدم
  user: {
    name: "Guest",
    xp: 0,
    level: 1,
    badges: []
  },

  // تحديث بيانات المستخدم بالكامل
  setUser: (newUser) => set({ user: newUser }),

  // إضافة XP وتحديث المستوى
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

  // إضافة Badge جديد
  addBadge: (badge) =>
    set((state) => ({
      user: {
        ...state.user,
        badges: [...state.user.badges, badge],
      },
    })),
}));
