"use client";

import { FilterType } from "./types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TodoFilters({ currentFilter, onFilterChange }: TodoFiltersProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Done", value: "completed" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-1.5 rounded-xl w-fit border border-slate-100">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors z-10",
            currentFilter === filter.value
              ? "text-indigo-900"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
          )}
        >
          {currentFilter === filter.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-white shadow-sm border border-slate-100 rounded-lg -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {filter.label}
        </button>
      ))}
    </div>
  );
}
