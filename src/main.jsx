import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CoreSyncProvider } from "@/context/CoreSyncContext";
import { AudienceProvider } from "@/context/AudienceContext";
import { InfluenceMissionsProvider } from "@/context/InfluenceMissionsContext";
import { CreatorProvider } from "@/context/CreatorContext";
import { WalletProvider } from "@/context/WalletContext";
import { PostsProvider } from "@/context/PostsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CoreSyncProvider>
      <AudienceProvider>
        <InfluenceMissionsProvider>
          <CreatorProvider>
            <WalletProvider>
              <PostsProvider>
                <App />
              </PostsProvider>
            </WalletProvider>
          </CreatorProvider>
        </InfluenceMissionsProvider>
      </AudienceProvider>
    </CoreSyncProvider>
  </React.StrictMode>
);
