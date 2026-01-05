// @ts-check

import fs from "node:fs";
import path from "node:path";

/**
 * Create a minimal logger with a prefix
 * @param {string} prefix
 */
export function createLogger(prefix) {
  const style = [
    "background: linear-gradient(to right, #a960ee, #f78ed4)",
    "color: white",
    "padding-inline: 4px",
    "border-radius: 2px",
    "font-family: monospace",
  ].join(";");

  return {
    log: (/** @type any[] */...args) => console.log(`%c${prefix}`, style, ...args),
    warn: (/** @type any[] */...args) => console.warn(`%c${prefix}`, style, ...args),
    error: (/** @type any[] */...args) => console.error(`%c${prefix}`, style, ...args),
  };
}


/**
 * Empties a directory by removing all its contents while keeping the directory itself.
 *
 * @param {string} dirPath - Path to the directory to empty
 */
export async function emptyDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    const entries = await fs.promises.readdir(dirPath);
    await Promise.all(
      entries.map((entry) =>
        fs.promises.rm(path.join(dirPath, entry), { recursive: true, force: true })
      )
    );
  }
}
