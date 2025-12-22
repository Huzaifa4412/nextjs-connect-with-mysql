"use client";

import { motion } from "motion/react";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-700",
    medium: "bg-orange-100 text-orange-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      whileHover={{ scale: 1.005 }}
      className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-indigo-100"
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
          todo.completed
            ? "bg-indigo-500 border-indigo-500"
            : "border-slate-300 hover:border-indigo-400"
        )}
      >
        <motion.div
          initial={false}
          animate={{ scale: todo.completed ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
        </motion.div>
      </button>

      <div className="flex-1 flex items-center gap-3 overflow-hidden">
        <span
          className={cn(
            "text-slate-700 font-medium transition-all duration-200 truncate",
            todo.completed && "text-slate-400 line-through decoration-slate-400 decoration-2"
          )}
        >
          {todo.task}
        </span>
        <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider", priorityColors[todo.priority])}>
          {todo.priority}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        aria-label="Delete todo"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
