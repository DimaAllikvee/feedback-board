import React from 'react';
import { FeedbackPost } from '../../types';

interface RoadmapProgressBarProps {
  posts: FeedbackPost[];
}

/**
 * RoadmapProgressBar inspired by keenthemes/reui & cosscom/coss
 * Visual breakdown of features across roadmap milestones.
 */
export const RoadmapProgressBar: React.FC<RoadmapProgressBarProps> = ({ posts }) => {
  const total = posts.length || 1;
  const completed = posts.filter((p) => p.status === 'completed').length;
  const inProgress = posts.filter((p) => p.status === 'in_progress').length;
  const planned = posts.filter((p) => p.status === 'planned').length;
  const underReview = posts.filter((p) => p.status === 'under_review').length;

  const pctCompleted = Math.round((completed / total) * 100);
  const pctInProgress = Math.round((inProgress / total) * 100);
  const pctPlanned = Math.round((planned / total) * 100);
  const pctUnderReview = 100 - pctCompleted - pctInProgress - pctPlanned;

  return (
    <div className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-3.5 backdrop-blur-md mb-4">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-semibold text-zinc-300">Overall Roadmap Velocity</span>
        <span className="text-[11px] text-zinc-400">
          <strong className="text-emerald-400">{pctCompleted}%</strong> Shipped to Production
        </span>
      </div>

      {/* Multi-segment progress bar */}
      <div className="h-2 w-full rounded-full bg-zinc-800/80 overflow-hidden flex">
        {completed > 0 && (
          <div
            style={{ width: `${(completed / total) * 100}%` }}
            className="h-full bg-emerald-500 transition-all duration-500"
            title={`Completed: ${completed} (${pctCompleted}%)`}
          />
        )}
        {inProgress > 0 && (
          <div
            style={{ width: `${(inProgress / total) * 100}%` }}
            className="h-full bg-purple-500 transition-all duration-500"
            title={`In Progress: ${inProgress} (${pctInProgress}%)`}
          />
        )}
        {planned > 0 && (
          <div
            style={{ width: `${(planned / total) * 100}%` }}
            className="h-full bg-blue-500 transition-all duration-500"
            title={`Planned: ${planned} (${pctPlanned}%)`}
          />
        )}
        {underReview > 0 && (
          <div
            style={{ width: `${(underReview / total) * 100}%` }}
            className="h-full bg-amber-500 transition-all duration-500"
            title={`Under Review: ${underReview} (${pctUnderReview}%)`}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 text-[11px] text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Completed ({completed})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <span>In Progress ({inProgress})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Planned ({planned})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Under Review ({underReview})</span>
        </div>
      </div>
    </div>
  );
};
