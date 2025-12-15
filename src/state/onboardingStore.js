import { create } from "zustand";

export const useOnboardingStore = create((set) => ({
  step: 1,

  // Identity (CPS)
  identity: {
    values: "",
    purpose: "",
    emotionalSignature: "",
    lifeStage: "",
  },

  // Cognitive (DTM)
  cognitive: {
    decisionStyle: "",
    biasPattern: "",
    thinkingMode: "",
    patternRecognition: "",
  },

  // Innovation (INN)
  innovation: {
    creativityLevel: "",
    problemSolvingStyle: "",
    conceptCreation: "",
    noveltyPreference: "",
  },

  // Maturity Scores
  dataMaturity: 0,
  innovationMaturity: 0,

  // Tribe Match
  tribeMatch: null,

  // Actions
  setStep: (step) => set({ step }),
  updateIdentity: (updates) =>
    set((state) => ({ identity: { ...state.identity, ...updates } })),
  updateCognitive: (updates) =>
    set((state) => ({ cognitive: { ...state.cognitive, ...updates } })),
  updateInnovation: (updates) =>
    set((state) => ({ innovation: { ...state.innovation, ...updates } })),
  setDataMaturity: (score) => set({ dataMaturity: score }),
  setInnovationMaturity: (score) => set({ innovationMaturity: score }),
  setTribeMatch: (tribe) => set({ tribeMatch: tribe }),
}));

