#!/usr/bin/env node

// @ts-check

/**
 * @fileoverview Fetches the latest release asset from GitHub, downloads,
 * and extracts it into a target directory. Node 22+ only.
 *
 * Usage:
 *   node install-acf-pro.js <target-directory>
 */

import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

/**
 * Fetches the download URL of the latest GitHub release asset matching a pattern.
 *
 * @param {string} owner - GitHub repository owner
 * @param {string} repo - GitHub repository name
 * @param {RegExp} pattern - Regex to match the asset name
 * @returns {Promise<string|null>} - The browser_download_url of the matching asset, or null if none found
 */
async function getLatestReleaseAsset(owner, repo, pattern) {
  const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "Node.js",
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub API request failed with status ${res.status}`);
  }

  const release = await res.json();

  if (!release.assets || release.assets.length === 0) return null;

  const asset = release.assets.find((/** @type any */ a) => pattern.test(a.name));
  return asset?.browser_download_url ?? null;
}

/**
 * Downloads a file from a URL and writes it to a target path.
 *
 * @param {string} url - File URL
 * @param {string} destPath - Local path to save the file
 */
async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download file: ${res.status}`);

  if (!res.body) throw new Error("No response body");

  // Convert WHATWG ReadableStream to Node.js Readable
  const nodeStream = Readable.fromWeb(res.body);

  await pipeline(nodeStream, fs.createWriteStream(destPath));
}

/**
 * Extracts a zip file into a target directory.
 *
 * @param {string} zipPath - Path to the zip file
 * @param {string} targetDir - Directory to extract into
 */
async function extractZip(zipPath, targetDir) {
  await fs.promises.mkdir(targetDir, { recursive: true });
  await execFileAsync("unzip", ["-q", "-o", zipPath, "-d", targetDir]);
}

(async () => {
  try {
    const targetDir = process.argv[2];
    if (!targetDir) {
      console.error("Error: You must provide a target directory.");
      process.exit(1);
    }

    const url = await getLatestReleaseAsset(
      "pronamic",
      "advanced-custom-fields-pro",
      /advanced-custom-fields-pro.*\.zip$/,
    );

    if (!url) {
      console.error("No matching asset found.");
      process.exit(1);
    }

    const zipFile = path.join(targetDir, "acf-pro.zip");
    const acfProDir = path.join(targetDir, "advanced-custom-fields-pro");

    // Download the zip
    console.log("Downloading:", url);
    await downloadFile(url, zipFile);

    // Remove existing installation if present
    if (fs.existsSync(acfProDir)) {
      console.log("Removing existing installation:", acfProDir);
      await fs.promises.rm(acfProDir, { recursive: true, force: true });
    }

    // Extract the zip
    console.log("Extracting to:", targetDir);
    await extractZip(zipFile, targetDir);

    // Remove zip after extraction
    await fs.promises.unlink(zipFile);

    console.log("Done!");
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
