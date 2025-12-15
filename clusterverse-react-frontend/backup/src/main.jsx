// ðŸ§© Patch: prevent "AFRAME is not defined" errors from rogue dependencies
window.AFRAME = window.AFRAME || { registerComponent: () => {} };

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * Core4.AI â€“ Root Bootstrap
 * Mounts the entire SPA.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
