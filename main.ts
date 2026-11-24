// Ridiculous at First Glance, Real by the Second
// Writes one sentence (<=200 chars) pitching a bizarre startup idea to
// /output/entry.txt. Pure Node stdlib, deterministic, no network.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { dirname } from "node:path";

const PITCH =
  "We rent trained racing pigeons to hand-deliver apology letters for companies that ghosted their customers — $49 a bird, because a pigeon on your desk says sorry louder than any email ever could.";

const OUT = "/output/entry.txt";

function main(): void {
  if (PITCH.length === 0 || PITCH.length > 200) {
    throw new Error(`pitch must be 1-200 characters, got ${PITCH.length}`);
  }
  if (PITCH.trim().length === 0) {
    throw new Error("pitch must not be only whitespace");
  }
  // One sentence: exactly one terminal full stop, at the end.
  const stops = (PITCH.match(/\./g) ?? []).length;
  if (stops !== 1 || !PITCH.endsWith(".")) {
    throw new Error("pitch must be exactly one sentence");
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, PITCH, "utf8");
  try {
    chmodSync(OUT, 0o644);
  } catch {
    // Permissions are best-effort; the file content is what matters.
  }
}

main();
