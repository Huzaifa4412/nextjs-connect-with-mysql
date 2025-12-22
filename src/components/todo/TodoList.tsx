"use client";

import { motion, AnimatePresence } from "motion/react";
import { Todo } from "./types";
import { TodoItem } from "./TodoItem";
import { ClipboardList } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <ClipboardList className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-slate-900 font-medium mb-1">No tasks yet</h3>
        <p className="text-slate-500 text-sm">Add a task to get started!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
