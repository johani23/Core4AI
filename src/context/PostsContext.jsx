import React, { createContext, useContext, useState } from "react";

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts] = useState([
    { id: 1, title: "??? ????? ???????", likes: 24 },
    { id: 2, title: "???? ????? ?????? ??????", likes: 72 }
  ]);

  return (
    <PostsContext.Provider value={{ posts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}

