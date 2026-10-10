/**
 * This runs anytime before committing files
 */
export default {
  "assets-src/**/*.{js,jsx,mjs,cjs,ts,mts,css,scss}": [
    () => "pnpm run analyse:js", // ← ignore files
    "prettier --write",
    () => "pnpm run build", // ← ignore files
    () => "git add ./assets", // ← ignore files
  ],
  "{*.php,{src,tests}/**/*.php}": [
    "pnpm run format:php",
    () => "pnpm run analyse:php", // ← ignore files (otherwise pest files would be analysed, too)
    () => "tools/make-pot.sh", // ← ignore files
    () => "git add ./languages", // ← ignore files
  ],
};
