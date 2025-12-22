"use server";

import { pool } from "@/config/db";
import { revalidatePath } from "next/cache";
import { Todo, Priority } from "@/components/todo/types";

// Read
export async function getData() {
    const connection = await pool.getConnection();
    try {
    const [rows] = await connection.execute('SELECT * FROM todos ORDER BY created_at DESC');
    return rows as Todo[];
  } finally {
    connection.release();
  }
}

// Create
export async function createTodo(task: string, priority: Priority = 'medium') {
  const connection = await pool.getConnection();
  try {
    await connection.execute('INSERT INTO todos (task, priority) VALUES (?, ?)', [task, priority]);
    revalidatePath("/");
  } finally {
    connection.release();
  }
}

// Update Status
export async function updateTodo(id: number, completed: boolean) {
  const connection = await pool.getConnection();
  try {
    await connection.execute('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]);
    revalidatePath("/");
  } finally {
    connection.release();
  }
}

// Delete
export async function deleteTodo(id: number) {
  const connection = await pool.getConnection();
  try {
    await connection.execute('DELETE FROM todos WHERE id = ?', [id]);
    revalidatePath("/");
  } finally {
    connection.release();
  }
}
