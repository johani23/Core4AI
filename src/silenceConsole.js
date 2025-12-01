// ============================================================
// 🔇 Core4.AI – Console Silence Mode (Beta)
// ------------------------------------------------------------
// Hides all React + WS console logs in production & dev
// Still allows console.error to appear for real problems
// ============================================================

const disabled = [
  "log",
  "info",
  "debug",
  "warn"
];

disabled.forEach((method) => {
  console[method] = () => {};
});
