// ============================================================================
// 💚 Core4.AI – Root Bootstrap (Final Stable Version)
// ============================================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global styles
import "./index.css";

// Context Providers
import { CoreSyncProvider } from "@/context/CoreSyncContext";
import AudienceProvider from "@/context/AudienceContext";
import { InfluenceScoreProvider } from "@/context/InfluenceScoreContext";
import { InfluenceMissionsProvider } from "@/context/InfluenceMissionsContext";
import { CreatorProvider } from "@/context/CreatorContext";
import { CreatorXPProvider } from "@/context/CreatorXPContext";
import { BuyerProvider } from "@/context/BuyerContext";
import { CartProvider } from "@/context/CartContext";
import { QuickViewProvider } from "@/context/QuickViewContext";
import { AttributionProvider } from "@/context/AttributionContext";
import { RevenueRankingProvider } from "@/context/RevenueRankingContext";
import { TribeProvider } from "@/context/TribeContext";
import { TribeInfluenceProvider } from "@/context/TribeInfluenceContext";
import { TribeFunnelProvider } from "@/context/TribeFunnelContext";
import { TribeChallengeProvider } from "@/context/TribeChallengeContext";

import { BrowserRouter as Router } from "react-router-dom";

// ============================================================================
//  🟩 React Root Mount
// ============================================================================

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <CoreSyncProvider>
        <AudienceProvider>
          <InfluenceScoreProvider>
            <InfluenceMissionsProvider>
              <CreatorXPProvider>
                <CreatorProvider>
                  <BuyerProvider>
                    <CartProvider>
                      <QuickViewProvider>
                        <AttributionProvider>
                          <RevenueRankingProvider>
                            <TribeProvider>
                              <TribeInfluenceProvider>
                                <TribeFunnelProvider>
                                  <TribeChallengeProvider>
                                    <App />
                                  </TribeChallengeProvider>
                                </TribeFunnelProvider>
                              </TribeInfluenceProvider>
                            </TribeProvider>
                          </RevenueRankingProvider>
                        </AttributionProvider>
                      </QuickViewProvider>
                    </CartProvider>
                  </BuyerProvider>
                </CreatorProvider>
              </CreatorXPProvider>
            </InfluenceMissionsProvider>
          </InfluenceScoreProvider>
        </AudienceProvider>
      </CoreSyncProvider>
    </Router>
  </React.StrictMode>
);
