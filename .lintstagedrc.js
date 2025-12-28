export default {
  "assets-src/**/*.{js,jsx,mjs,cjs,ts,mts,css,scss}": ["prettier --write", "pnpm run build"],
  "**/*.php": ["pnpm run format:php", "pnpm run analyse:php"],
};
