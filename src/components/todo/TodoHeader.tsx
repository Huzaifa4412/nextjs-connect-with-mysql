"use client";

import * as React from "react";
import { motion } from "motion/react";

interface TodoHeaderProps {
  total: number;
  completed: number;
}

export function TodoHeader({ total, completed }: TodoHeaderProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
          <p className="text-slate-500 font-medium">{date}</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-2xl">
          <span className="text-indigo-700 font-bold text-lg">
            {completed}/{total}
          </span>
        </div>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-indigo-500 rounded-full"
        />
      </div>
    </header>
  );
}
