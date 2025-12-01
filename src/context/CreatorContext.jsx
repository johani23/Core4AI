import React, { createContext, useContext, useState } from "react";

const CreatorContext = createContext();

export function CreatorProvider({ children }) {
  const [stats] = useState({
    followers: 1200,
    posts: 14,
    earnings: 350,
  });

  return (
    <CreatorContext.Provider value={{ stats }}>
      {children}
    </CreatorContext.Provider>
  );
}

export function useCreator() {
  return useContext(CreatorContext);
}
