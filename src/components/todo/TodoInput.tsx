"use client";

import * as React from "react";
import { Plus, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Priority } from "./types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface TodoInputProps {
  onAdd: (text: string, priority: Priority) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = React.useState("");
  const [priority, setPriority] = React.useState<Priority>("medium");
  const [showPriority, setShowPriority] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority);
      setText("");
      setPriority("medium");
      setShowPriority(false);
    }
  };

  const priorityConfig = {
    low: { color: "bg-blue-100 text-blue-700", label: "Low Priority" },
    medium: { color: "bg-orange-100 text-orange-700", label: "Medium Priority" },
    high: { color: "bg-red-100 text-red-700", label: "High Priority" },
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 relative z-20">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new professional task..."
            className="w-full bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-colors pr-32"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
             <button
              type="button"
              onClick={() => setShowPriority(!showPriority)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-slate-50",
                priorityConfig[priority].color
              )}
            >
              {priorityConfig[priority].label.split(" ")[0]}
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
        <Button
          type="submit"
          disabled={!text.trim()}
          className="w-12 h-12 rounded-xl flex items-center justify-center p-0 shrink-0 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <AnimatePresence>
        {showPriority && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-16 top-14 bg-white rounded-xl shadow-xl border border-slate-100 p-2 w-48 flex flex-col gap-1 z-30"
          >
            {(Object.keys(priorityConfig) as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPriority(p);
                  setShowPriority(false);
                }}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                  priority === p ? "bg-slate-50 font-medium" : "hover:bg-slate-50 text-slate-600"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full", 
                  p === "low" ? "bg-blue-500" : 
                  p === "medium" ? "bg-orange-500" : "bg-red-500"
                )} />
                {priorityConfig[p].label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
