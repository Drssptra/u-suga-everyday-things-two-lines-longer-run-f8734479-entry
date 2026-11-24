// main.ts — "Everyday Things, Two Lines, Longer Run" (make.fun bounty)
//
// Writes a two-line explanation of a queue, written for a 10-year-old,
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt) with no
// trailing newline, and prints the same text to stdout.
//
// Line 1 explains the queue through a single analogy: a slow
// caterpillar made of people, shuffling toward the front. Line 2 is
// honest about what that picture gets right and where it breaks down.
// The text is fixed, so every run produces identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = [
  "A queue is a slow caterpillar made of people, inching forward one wiggle at a time toward the treat at its head.",
  "It maps the single-file shuffle where nobody overtakes, but it leaves out that people can step out of line whenever they like, while a caterpillar's segments never can.",
].join("\n");

// The gate wants 1 to 400 characters of non-whitespace UTF-8 text,
// so refuse to write anything outside that range.
if (ENTRY.length < 1 || ENTRY.length > 400 || ENTRY.trim().length === 0) {
  console.error(`entry is ${ENTRY.length} characters, outside the 1-400 gate`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
