"use client";

import React from "react";
import { ArrowUpRight, Trophy } from "lucide-react";

const profiles = [
  {
    name: "GitHub",
    handle: "GITGUYX8",
    href: "https://github.com/GITGUYX8",
  },
  {
    name: "LeetCode",
    handle: "_yASHy_",
    href: "https://leetcode.com/u/_yASHy_/",
  },
  {
    name: "Codeforces",
    handle: "_Yashy_",
    href: "https://codeforces.com/profile/_Yashy_",
  },
];

type Competition = {
  event: string;
  project: string;
  result: string;
  tone: "rank" | "win" | "finalist" | "part";
};

const competitions: Competition[] = [
  { event: "ICPC 2025 (Kanpur Region)", project: "Competitive Programming", result: "Rank 2027", tone: "rank" },
  { event: "IICPC CodeFest 2026 Global", project: "Prelims (13,000+ participants)", result: "Rank 4085", tone: "rank" },
  { event: "Hack WithMait @MAIT", project: "AI&I Website", result: "2nd Place", tone: "win" },
  { event: "NEX-Hack @IITM", project: "openCodeSource Platform", result: "Finalist", tone: "finalist" },
  { event: "SIH-2025", project: "ARTIFACT Vehicle", result: "Shortlisted", tone: "finalist" },
  { event: "VIHAAN 8.0 @DTU", project: "E-VTON", result: "Participant", tone: "part" },
  { event: "Techkriti 25 @IIT Kanpur", project: "HOVERCRAFT", result: "Participant", tone: "part" },
  { event: "E-yantra-25 @IIT Bombay", project: "Krishi Drone Theme", result: "Participant", tone: "part" },
];

const badgeStyles: Record<Competition["tone"], string> = {
  rank: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  win: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
  finalist: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  part: "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border border-black/5 dark:border-white/5",
};

export function Achievements() {
  return (
    <div className="block">
      <div className="flex flex-wrap gap-2 py-4">
        {profiles.map((profile) => (
          <a
            key={profile.name}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#0a0a0a] dark:hover:bg-[#121214] border border-black/30 dark:border-white/[0.15] rounded-[6px] transition-colors duration-200"
          >
            <Trophy className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors" />
            <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
              {profile.name}
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
              {profile.handle}
            </span>
            <ArrowUpRight className="h-3 w-3 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors" />
          </a>
        ))}
      </div>

      {competitions.map((item, idx) => {
        const isLast = idx === competitions.length - 1;

        return (
          <div
            key={item.event}
            className="group relative block -mx-4 px-4 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors"
          >
            {!isLast && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none z-10"
                style={{
                  maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                }}
              />
            )}

            {isLast && (
              <>
                <div
                  className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none z-10"
                  style={{
                    maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                    WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  }}
                />
                <div className="absolute bottom-0 left-0 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
                <div className="absolute bottom-0 right-0 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              </>
            )}

            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {item.event}
                </span>
                <span className="text-[12px] text-zinc-500 dark:text-zinc-400 truncate">
                  {item.project}
                </span>
              </div>
              <span
                className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${badgeStyles[item.tone]}`}
              >
                {item.result}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Achievements;
