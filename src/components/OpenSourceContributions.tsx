"use client";

import Link from "next/link";

interface Contribution {
  id: number;
  title: string;
  url: string;
  repository: string;
}

// Static curation for GitHub Pages (no server-side token available).
// All links point at real GITGUYX8 repositories / profile.
const CONTRIBUTIONS: Contribution[] = [
  {
    id: 1,
    title: "SCNARE v3: ROS 2 EKS lab platform (NestJS + K8s)",
    url: "https://github.com/GITGUYX8/v3_SCNARE_eks-",
    repository: "GITGUYX8/v3_SCNARE_eks-",
  },
  {
    id: 2,
    title: "AWS cloud-native web deployment (ECS Fargate + ALB)",
    url: "https://github.com/GITGUYX8/aws-deploy",
    repository: "GITGUYX8/aws-deploy",
  },
  {
    id: 3,
    title: "Rviz2 web-streaming pipeline (noVNC + WebSockets)",
    url: "https://github.com/GITGUYX8/rviz2-nvnc-pipeline",
    repository: "GITGUYX8/rviz2-nvnc-pipeline",
  },
  {
    id: 4,
    title: "SNARE v2 environment & control panel (ECS + GitHub Actions)",
    url: "https://github.com/GITGUYX8/v2_SCANE",
    repository: "GITGUYX8/v2_SCANE",
  },
  {
    id: 5,
    title: "Backend collaborator: auth, caching & admin (7+ merged PRs)",
    url: "https://github.com/GITGUYX8?tab=repositories",
    repository: "GITGUYX8",
  },
];

export function OpenSourceContributions({ isFullPage = false }: { isFullPage?: boolean }) {
  const initialCount = 4;
  const visible = isFullPage ? CONTRIBUTIONS : CONTRIBUTIONS.slice(0, initialCount);

  return (
    <div className="w-full flex flex-col">
      <div className="py-2 relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Contributions</h2>

        {/* Horizontal line below heading */}
        <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
        {/* Intersections */}
        <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
        <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
      </div>

      <div className="relative pt-0 pb-2">
        <div className="flex flex-col">
          {visible.map((item, idx) => {
            const isLast = idx === visible.length - 1;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-1.5 py-4 px-4 -mx-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/20 rounded-lg"
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
                <div className="flex items-center gap-2.5 relative z-20 min-w-0">
                  <div className="w-2 h-2 rounded-full shrink-0 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                  <h3 className="text-[14px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors truncate">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[12px] text-zinc-500 dark:text-zinc-400 ml-4.5 pl-0.5 relative z-20">
                  {item.repository}
                </p>
              </a>
            );
          })}

          {!isFullPage && CONTRIBUTIONS.length > initialCount && (
            <div className="flex justify-center mt-4 relative z-20">
              <Link href="/pull-requests" className="relative group block">
                <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
                <div className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                  View All ({CONTRIBUTIONS.length - initialCount} more)
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-transform duration-300 -rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
