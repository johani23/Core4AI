// ============================================================
// Ã°Å¸Â§Â  Core4.AI Ã¢â‚¬â€œ ContentEvaluatorCore.js
// ------------------------------------------------------------
// Basic semantic heuristics to simulate AI evaluation
// ============================================================

export function evaluateContent(text) {
  const lengthScore = Math.min(text.length / 280, 1); // short posts fine-tuned
  const curiosity = /why|how|what if|imagine/i.test(text) ? 1 : 0.5;
  const emotional = /love|fear|dream|hope|feel/i.test(text) ? 1 : 0.4;
  const structure = /[.!?]/.test(text) ? 1 : 0.6;

  const total = (lengthScore + curiosity + emotional + structure) / 4;
  return parseFloat(total.toFixed(2));
}

