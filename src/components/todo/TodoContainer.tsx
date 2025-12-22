"use client";

import * as React from "react";
import { Todo, FilterType, Priority } from "./types";
import { TodoHeader } from "./TodoHeader";
import { TodoFilters } from "./TodoFilters";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { motion } from "motion/react";
import { createTodo, updateTodo, deleteTodo } from "@/lib/db";

interface TodoContainerProps {
  initialTodos: Todo[];
}

export function TodoContainer({ initialTodos }: TodoContainerProps) {
  // We use useOptimistic here to show immediate UI updates while the server action runs.
  // Actually, for simplicity and reliability with the current setup (props driven), 
  // let's just use the props as the source of truth if we trust revalidatePath,
  // OR use optimistic state.
  // Given standard Next.js patterns with revalidatePath, we can just use the prop.
  // But for "Not stuck", optimistic is best.
  
  const [optimisticTodos, addOptimisticTodo] = React.useOptimistic(
    initialTodos,
    (state, newTodo: Todo | string | number) => {
      // Handle the various optimistic updates
      if (typeof newTodo === "string" || typeof newTodo === "number") {
         // This is for delete/toggle? No, useOptimistic reducer is usually for one specific action type or a complex reducer.
         // Let's keep it simple: We will do client-side mutation then call server.
         // The props `initialTodos` will update when server revalidates.
         return state; 
      }
      return [newTodo, ...state];
    }
  );

  // However, useOptimistic is complex to map all actions (add, delete, toggle) to one reducer without a customized action type.
  // Let's use a standard React state initialized with props, but updated via effects if props change.
  // This is the "syncing" pattern.
  
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);

  React.useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const [filter, setFilter] = React.useState<FilterType>("all");

  const handleAdd = async (text: string, priority: Priority) => {
    // Optimistic Update
    const tempId = Date.now();
    const newTodo: Todo = {
      id: tempId,
      task: text,
      completed: false,
      created_at: new Date(),
      priority
    };
    setTodos((prev) => [newTodo, ...prev]);

    // Server Action
    await createTodo(text, priority);
    // The useEffect will update state when server returns new list via props.
  };

  const handleToggle = async (id: number) => {
    // Optimistic
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    // Server Action
    await updateTodo(id, !todo.completed);
  };

  const handleDelete = async (id: number) => {
    // Optimistic
    setTodos((prev) => prev.filter((t) => t.id !== id));

    // Server Action
    await deleteTodo(id);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    if (filter === "high") return todo.priority === "high";
    if (filter === "medium") return todo.priority === "medium";
    if (filter === "low") return todo.priority === "low";
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto w-full bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100"
    >
      <TodoHeader total={todos.length} completed={completedCount} />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
      </div>

      <TodoInput onAdd={handleAdd} />
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}
