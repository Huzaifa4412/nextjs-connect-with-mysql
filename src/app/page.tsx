import { TodoContainer } from "@/components/todo/TodoContainer";
import { getData } from "@/lib/db";

export default async function Home() {
  const todos = await getData();

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <TodoContainer initialTodos={todos} />
    </main>
  );
}