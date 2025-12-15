// ============================================================
// Ã°Å¸â€™Å½ Core4.AI Project Utility Ã¢â‚¬â€œ Move Pages Script
// ------------------------------------------------------------
// Moves all files from src/components/pages/ Ã¢â€ â€™ src/pages/
// and automatically fixes imports in .jsx/.js files.
// ============================================================

import fs from "fs";
import path from "path";
import glob from "glob";

// --- Paths ---
const SRC = path.resolve("./src");
const OLD_PAGES = path.join(SRC, "components/pages");
const NEW_PAGES = path.join(SRC, "pages");

// --- Ensure new directory exists ---
if (!fs.existsSync(NEW_PAGES)) {
  fs.mkdirSync(NEW_PAGES, { recursive: true });
  console.log("Ã¢Å“â€¦ Created:", NEW_PAGES);
}

// --- Move all page files ---
const files = glob.sync(`${OLD_PAGES}/**/*.{jsx,js}`);
if (files.length === 0) {
  console.log("Ã¢Å¡Â Ã¯Â¸Â No files found in:", OLD_PAGES);
  process.exit(0);
}

for (const file of files) {
  const filename = path.basename(file);
  const newPath = path.join(NEW_PAGES, filename);
  fs.renameSync(file, newPath);
  console.log(`Ã°Å¸â€œÂ¦ Moved: ${filename} Ã¢â€ â€™ /src/pages`);
}

// --- Update imports in all src files ---
const jsxFiles = glob.sync(`${SRC}/**/*.{jsx,js}`, { ignore: ["node_modules/**"] });

for (const file of jsxFiles) {
  let content = fs.readFileSync(file, "utf-8");
  const updated = content.replace(/@components\/pages\//g, "@pages/");
  if (updated !== content) {
    fs.writeFileSync(file, updated);
    console.log(`Ã°Å¸â€ºÂ Ã¯Â¸Â Updated imports in: ${file.replace(SRC, "src")}`);
  }
}

console.log("\nÃ¢Å“Â¨ Done! All pages moved and imports updated.");
console.log("Ã°Å¸Å¡â‚¬ You can now run: npm run dev");

