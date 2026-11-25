// Everyday Things, Two Lines, Longer Run — v2 resubmit.
//
// A toaster, explained to a ten-year-old in exactly two sentences.
// The first sentence carries one picture all the way through: bread
// on a sunbed. The second sentence then does the honest work — it
// says which part of that picture is true and which part would
// mislead you if you trusted it too far.
//
// The program below assembles those two sentences, checks them
// against the competition gate, and writes them — with no trailing
// newline — to entry.txt inside $MAKEFUN_OUTPUT_DIR. Nothing here
// touches the network, reads other files, or varies between runs:
// the same two sentences come out every time, byte for byte.

import * as fs from "node:fs";
import * as path from "node:path";

const FIRST_LINE =
  "A toaster is a sunbed for a slice of bread, holding it under glowing bars until it comes out brown, warm, and crisp.";

const SECOND_LINE =
  "It maps the way heat browns the surface just like the sun tans skin, but it leaves out that a sunbed warms the whole body slowly while a toaster only toasts the outside in two minutes.";

function assemble(first: string, second: string): string {
  const separator = String.fromCharCode(10);
  return first + separator + second;
}

function checkGate(text: string): void {
  const lines = text.split("\n");
  const problems: string[] = [];

  if (lines.length !== 2) {
    problems.push(`expected exactly 2 lines, got ${lines.length}`);
  }
  if (text.length < 1 || text.length > 400) {
    problems.push(`entry is ${text.length} characters, outside 1-400`);
  }
  if (text.trim().length === 0) {
    problems.push("entry is only whitespace");
  }
  if (text.endsWith("\n")) {
    problems.push("entry must not end with a newline");
  }
  for (const [index, line] of lines.entries()) {
    if (line.trim().length === 0) {
      problems.push(`line ${index + 1} is empty`);
    }
  }

  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`gate failure: ${problem}`);
    }
    process.exit(1);
  }
}

function outputDirectory(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.length > 0) {
    return fromEnv;
  }
  return path.resolve("/output");
}

function main(): void {
  const entry = assemble(FIRST_LINE, SECOND_LINE);
  checkGate(entry);

  const dir = outputDirectory();
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, "entry.txt");
  // Encode explicitly so the file is UTF-8 with no added newline.
  const bytes = new TextEncoder().encode(entry);
  fs.writeFileSync(target, bytes);
  // Stdout may end with a newline; the file must not.
  process.stdout.write(entry + "\n");
}

main();
