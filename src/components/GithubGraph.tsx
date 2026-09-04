"use client";

import React, { useEffect, useMemo, useState } from "react";
import snapshot from "@/data/githubContributions.json";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionMonth {
  name: string;
}

interface ContributionLevel {
  cell: string;
}

interface TooltipState {
  count: number;
  date: string;
  x: number;
  y: number;
}

export function GithubGraph() {
  // Seeded with the real full-year snapshot (scripts/fetch-github-contributions.mjs).
  const [weeks, setWeeks] = useState<ContributionWeek[]>(snapshot.weeks);
  const [months, setMonths] = useState<ContributionMonth[]>([]);
  const [totalContributions, setTotalContributions] = useState(snapshot.totalContributions);
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [refreshFailed, setRefreshFailed] = useState(false);

  const emptyWeeks = useMemo<ContributionWeek[]>(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 370);

    return Array.from({ length: 53 }, (_, weekIndex) => ({
      contributionDays: Array.from({ length: 7 }, (_, dayIndex) => {
        const date = new Date(start);
        date.setDate(start.getDate() + weekIndex * 7 + dayIndex);

        return {
          contributionCount: 0,
          date: date.toISOString().slice(0, 10),
        };
      }),
    }));
  }, []);

  useEffect(() => {
    // Layer fresh public-events activity over the snapshot (rate-limited;
    // snapshot stays on screen if this fails).
    const refreshRecent = async () => {
      const username = "GITGUYX8";
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=100`
        );
        if (!response.ok) throw new Error(`GitHub API ${response.status}`);
        const events = await response.json();

        const live: Record<string, number> = {};
        for (const event of events) {
          const date = new Date(event.created_at).toISOString().slice(0, 10);
          const weight = event.type === "PushEvent" ? event.payload?.commits?.length || 1 : 1;
          live[date] = (live[date] || 0) + weight;
        }

        let total = 0;
        const merged: ContributionWeek[] = snapshot.weeks.map((week) => ({
          contributionDays: week.contributionDays.map((day) => {
            const count = Math.max(day.contributionCount, live[day.date] || 0);
            total += count;
            return { ...day, contributionCount: count };
          }),
        }));

        setWeeks(merged);
        setTotalContributions(total);
      } catch (error) {
        console.error("Failed to refresh GitHub contributions", error);
        setRefreshFailed(true);
      }
    };

    refreshRecent();
  }, []);

  const contributionLevels = useMemo<ContributionLevel[]>(
    () => [
      {
        cell: "bg-[#ebedf0] dark:bg-[#161b22]",
      },
      {
        cell: "bg-[#9be9a8] dark:bg-[#0e4429]",
      },
      {
        cell: "bg-[#40c463] dark:bg-[#006d32]",
      },
      {
        cell: "bg-[#30a14e] dark:bg-[#26a641]",
      },
      {
        cell: "bg-[#216e39] dark:bg-[#39d353]",
      },
    ],
    []
  );

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  };

  const showTooltip = (
    day: ContributionDay,
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.FocusEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      count: day.contributionCount,
      date: formatDate(day.date),
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const defaultMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const displayMonths = months.length > 0 ? months.map(m => m.name.substring(0, 3)) : defaultMonths;
  const graphWeeks = weeks.length > 0 ? weeks : emptyWeeks;
  const graphStatus =
    loading && totalContributions === 0
      ? "Loading GitHub contribution activity"
      : `${totalContributions} GitHub activities in the last year${refreshFailed ? ` — snapshot ${snapshot.fetchedAt}` : ""}`;
  const dashedLineMask = {
    maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
    WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  };

  return (
    <section
      className="relative z-10 mt-6 flex flex-col scroll-mt-24"
      aria-labelledby="github-activity-title"
      aria-describedby="github-activity-summary"
    >
      {/* Top full-width dashed line */}
      <div
        className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 pointer-events-none dark:border-white/[0.15]"
        style={dashedLineMask}
      />
      <div className="absolute top-0 -left-4 z-20 size-[2px] -translate-x-1/2 -translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
      <div className="absolute top-0 -right-4 z-20 size-[2px] translate-x-1/2 -translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />

      {/* Heading */}
      <div className="relative py-2">
        <div className="flex items-center justify-between gap-3">
          <h2 id="github-activity-title" className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            GitHub Activity
          </h2>
          <p className="text-right text-[11px] text-zinc-500 dark:text-zinc-400" aria-live="polite">
            {graphStatus}
          </p>
        </div>

        {/* Bottom full-width dashed line under heading */}
        <div
          className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 pointer-events-none dark:border-white/[0.15]"
          style={dashedLineMask}
        />
        <div className="absolute bottom-0 -left-4 z-20 size-[2px] -translate-x-1/2 translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
        <div className="absolute bottom-0 -right-4 z-20 size-[2px] translate-x-1/2 translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
      </div>

      <p id="github-activity-summary" className="sr-only">
        Calendar heatmap showing daily GitHub contribution counts for GITGUYX8 over the last year. Scroll horizontally to inspect all weeks.
      </p>

      {/* Graph content — sits directly on the page background */}
      <div className="relative py-4">
        <div className="w-full">
          <div>
            <div className="mb-2 flex w-full justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
              {displayMonths.map((month, index) => (
                <span key={`${month}-${index}`}>{month}</span>
              ))}
            </div>

            <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-x-[2px]" role="img" aria-label={graphStatus}>
              {loading && weeks.length === 0
                ? Array.from({ length: 53 }).map((_, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-[2px]">
                      {Array.from({ length: 7 }).map((__, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="aspect-square w-full animate-pulse rounded-[2px] bg-zinc-100 dark:bg-zinc-800"
                        />
                      ))}
                    </div>
                  ))
                : graphWeeks.map((week, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-[2px]">
                      {colIndex === 0 &&
                        Array.from({ length: 7 - week.contributionDays.length }).map((_, i) => (
                          <div key={`empty-top-${i}`} className="aspect-square w-full rounded-[2px] bg-transparent" />
                        ))}

                      {week.contributionDays.map((day) => {
                        const level = getLevel(day.contributionCount);
                        const color = contributionLevels[level];

                        return (
                          <div
                            key={day.date}
                            aria-hidden="true"
                            aria-label={`${day.contributionCount} contributions on ${formatDate(day.date)}`}
                            className={`aspect-square w-full rounded-[2px] opacity-80 outline-none transition-[opacity,transform] hover:scale-125 hover:opacity-100 dark:opacity-70 dark:hover:opacity-100 ${color.cell}`}
                            onMouseEnter={(event) => showTooltip(day, event)}
                            onMouseLeave={() => setTooltip(null)}
                          />
                        );
                      })}

                      {colIndex !== 0 &&
                        week.contributionDays.length < 7 &&
                        Array.from({ length: 7 - week.contributionDays.length }).map((_, i) => (
                          <div key={`empty-bottom-${i}`} className="aspect-square w-full rounded-[2px] bg-transparent" />
                        ))}
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Less active</span>
          <div className="flex shrink-0 items-center gap-1.5">
            {contributionLevels.map((level, index) => (
              <div
                key={index}
                aria-hidden="true"
                className={`size-2 rounded-[2px] opacity-80 dark:opacity-70 ${level.cell}`}
              />
            ))}
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">More active</span>
          </div>
        </div>

        {tooltip && (
          <div
            className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-zinc-700 shadow-lg shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:shadow-black/40"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.count} contributions on {tooltip.date}
          </div>
        )}
      </div>

      {/* Bottom full-width dashed line */}
      <div
        className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 pointer-events-none dark:border-white/[0.15]"
        style={dashedLineMask}
      />
      <div className="absolute bottom-0 -left-4 z-20 size-[2px] -translate-x-1/2 translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
      <div className="absolute bottom-0 -right-4 z-20 size-[2px] translate-x-1/2 translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
    </section>
  );
}
