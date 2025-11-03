import React from 'react';
import { PieChart } from 'lucide-react';

const CalorieSummary = ({ total, goal, onGoalChange }) => {
  const clamped = Math.min(total, goal || 0);
  const progress = goal > 0 ? Math.min(100, Math.round((clamped / goal) * 100)) : 0;
  const remaining = Math.max(0, (goal || 0) - total);

  return (
    <section className="rounded-2xl border p-5 bg-card/50 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-orange-500" />
          <h2 className="font-medium">Today</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Goal</span>
          <input
            type="number"
            min={0}
            value={goal}
            onChange={(e) => onGoalChange(Number(e.target.value))}
            className="w-24 bg-background border rounded-md px-2 py-1 text-right"
          />
          <span className="text-muted-foreground">kcal</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-semibold">
            {total}
            <span className="text-base ml-1 text-muted-foreground">kcal</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {remaining} kcal left
          </div>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default CalorieSummary;
