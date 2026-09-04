// Fetches real full-year GitHub contribution data (no token needed) and
// snapshots it to src/data/githubContributions.json for the static export.
// Re-run before each deploy to refresh:  npm run fetch:github
// Source: https://github.com/users/GITGUYX8/contributions (public HTML fragment)

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const USERNAME = "GITGUYX8";
const OUT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "githubContributions.json"
);

async function main() {
  const res = await fetch(`https://github.com/users/${USERNAME}/contributions`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (portfolio static export)",
      Accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  const html = await res.text();

  const totalMatch = html.match(/(\d[\d,]*)\s+contributions\s+in the last year/);
  const dates = [...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"/g)].map((m) => m[1]);
  const counts = [...html.matchAll(/(No contributions|\d+ contributions?) on [A-Z][a-z]+ \d+/g)].map(
    (m) => (m[1] === "No contributions" ? 0 : parseInt(m[1], 10))
  );

  if (dates.length === 0 || dates.length !== counts.length) {
    throw new Error(`Parse mismatch: ${dates.length} dates vs ${counts.length} counts`);
  }

  const days = dates
    .map((date, i) => ({ date, contributionCount: counts[i] }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({ contributionDays: days.slice(i, i + 7) });
  }

  const totalContributions = days.reduce((sum, d) => sum + d.contributionCount, 0);
  const headlineTotal = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : null;
  if (headlineTotal !== null && Math.abs(headlineTotal - totalContributions) > 2) {
    console.warn(
      `Headline total (${headlineTotal}) differs from summed days (${totalContributions})`
    );
  }

  const payload = {
    username: USERNAME,
    totalContributions,
    months: [],
    weeks,
    fetchedAt: new Date().toISOString().slice(0, 10),
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + "\n");
  console.log(
    `Wrote ${OUT_PATH}: ${totalContributions} contributions across ${days.length} days (fetched ${payload.fetchedAt})`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
