export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
  created_at: Date;
  priority: Priority;
}

export type FilterType = "all" | "active" | "completed" | "high" | "medium" | "low";
