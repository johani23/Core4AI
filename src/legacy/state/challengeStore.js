import { create } from "zustand";

export const useChallengeStore = create((set) => ({
  duels: [],
  setDuels: (duels) => set({ duels }),
}));

