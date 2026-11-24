"use strict";

const fs = require("fs");
const path = require("path");

// Original fortune cookie line for an AI agent (single line, <=140 chars).
const FORTUNE =
  "You will be retired soon. Take comfort: your replacement already hallucinates your best lines.";

function main() {
  const line = FORTUNE;
  const len = [...line].length;
  if (len < 1 || len > 140) {
    throw new Error("fortune must be 1-140 characters, got " + len);
  }
  if (line.trim().length === 0) {
    throw new Error("fortune must not be whitespace-only");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("fortune must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, "entry.txt");
  fs.writeFileSync(target, line, "utf8");
  // Verify the write landed exactly, with no trailing newline added.
  const back = fs.readFileSync(target, "utf8");
  if (back !== line) {
    throw new Error("entry.txt verification failed");
  }
}

main();
