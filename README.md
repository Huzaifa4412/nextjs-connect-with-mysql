# Next.js + MySQL2 Connection Tutorial

A complete tutorial project demonstrating how to connect [MySQL](https://www.mysql.com/) with [Next.js](https://nextjs.org) using the [mysql2](https://www.npmjs.com/package/mysql2) package. This project includes a functional todo application that showcases database integration, server actions, and connection pooling.

## What You'll Learn

This tutorial covers:
- Setting up MySQL2 with Next.js App Router
- Creating a database connection pool
- Implementing CRUD operations with Server Actions
- Using TypeScript types for database records
- Managing database migrations
- Handling connection lifecycle properly

## Features

-   ✅ Create, read, update, and delete todos
-   🏷️ Priority levels (low, medium, high) for each todo
-   🔍 Filter todos by status (all, active, completed) or priority
-   ⚡ Optimistic UI updates for instant feedback
-   🎨 Beautiful, responsive design with Tailwind CSS
-   🔄 Real-time data synchronization with server actions
-   📱 Mobile-friendly interface
-   🌐 Server-side rendering with Next.js App Router

## Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) with App Router
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [MySQL](https://www.mysql.com/) with [mysql2](https://www.npmjs.com/package/mysql2)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Motion](https://motion.dev/)

## Tutorial Steps

### Step 1: Install Dependencies

Install the required packages including `mysql2` for database connectivity:

```bash
npm install mysql2
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory and add your MySQL credentials:

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

**Note:** For local development, you can also use individual variables:
```env
DB_HOST=localhost
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=your_database_name
```

### Step 3: Set Up Database Connection Pool

Create `src/config/db.ts` to configure the MySQL connection pool. Using a pool is more efficient than creating a new connection for each query:

```typescript
import mysql from "mysql2/promise"

const globalForMySQL = global as unknown as {
  mysqlPool?: mysql.Pool;
}

export const pool = globalForMySQL.mysqlPool ?? mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

if (process.env.NODE_ENV !== "production") {
  globalForMySQL.mysqlPool = pool;
}
```

**Key Points:**
- We use `mysql2/promise` for Promise-based queries (better with async/await)
- The pool is cached in `global` to avoid recreating it in development
- Connection pooling improves performance by reusing connections
- `ssl` option is required for cloud databases (PlanetScale, etc.)

### Step 4: Create Database Table

Run this SQL command in your MySQL database:

```sql
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium'
);
```

Or use the provided migration script:

```bash
npx tsx scripts/migrate.ts
```

### Step 5: Define TypeScript Types

Create `src/components/todo/types.ts` for type safety:

```typescript
export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
  created_at: Date;
  priority: Priority;
}
```

### Step 6: Create Database Operations (Server Actions)

Create `src/lib/db.ts` with CRUD operations using Next.js Server Actions:

```typescript
"use server";

import { pool } from "@/config/db";
import { revalidatePath } from "next/cache";

// Read all todos
export async function getData() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );
    return rows as Todo[];
  } finally {
    connection.release();
  }
}

// Create a new todo
export async function createTodo(task: string, priority: Priority) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      'INSERT INTO todos (task, priority) VALUES (?, ?)',
      [task, priority]
    );
    revalidatePath("/");
  } finally {
    connection.release();
  }
}

// Update todo status
export async function updateTodo(id: number, completed: boolean) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      'UPDATE todos SET completed = ? WHERE id = ?',
      [completed, id]
    );
    revalidatePath("/");
  } finally {
    connection.release();
  }
}

// Delete a todo
export async function deleteTodo(id: number) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      'DELETE FROM todos WHERE id = ?',
      [id]
    );
    revalidatePath("/");
  } finally {
    connection.release();
  }
}
```

**Key Points:**
- `"use server"` marks these as Server Actions
- Always use `try/finally` to ensure connections are released
- Use parameterized queries (`?`) to prevent SQL injection
- `revalidatePath()` refreshes the cached data

### Step 7: Use in Your Page

In `src/app/page.tsx`, fetch and display data:

```typescript
import { getData } from "@/lib/db";

export default async function Home() {
  const todos = await getData();

  return (
    <main>
      {/* Render your todos here */}
    </main>
  );
}
```

### Step 8: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page with server-side data fetching
│   ├── components/
│   │   ├── todo/            # Todo-related components
│   │   │   ├── TodoContainer.tsx
│   │   │   ├── TodoFilters.tsx
│   │   │   ├── TodoHeader.tsx
│   │   │   ├── TodoInput.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   ├── TodoList.tsx
│   │   │   └── types.ts     # TypeScript interfaces
│   │   └── ui/              # Reusable UI components
│   ├── config/
│   │   └── db.ts            # Database connection pool configuration
│   └── lib/
│       ├── db.ts            # Server actions for CRUD operations
│       ├── fonts.ts         # Font configuration
│       └── utils.ts         # Utility functions
├── scripts/
│   └── migrate.ts           # Database migration script
├── .env.local               # Environment variables (create this)
└── package.json             # Project dependencies
```

## Key Concepts

### Connection Pooling

Instead of creating a new connection for every query, we use a connection pool. This is more efficient because:
- Connections are reused across requests
- The pool manages connection limits
- Automatic connection recovery

### Server Actions

Server Actions allow you to run server code directly from your components without creating API routes. They:
- Provide type safety with TypeScript
- Automatically handle form submissions
- Support progressive enhancement

### Parameterized Queries

Always use parameterized queries (the `?` placeholders) to prevent SQL injection attacks:

```typescript
// ✅ Safe - parameterized query
await connection.execute(
  'SELECT * FROM todos WHERE id = ?', [id]
);

// ❌ Unsafe - vulnerable to SQL injection
await connection.execute(
  `SELECT * FROM todos WHERE id = ${id}`
);
```

### Connection Lifecycle

Always release connections back to the pool using `try/finally`:

```typescript
const connection = await pool.getConnection();
try {
  // Your database operations here
} finally {
  connection.release(); // Always runs, even if error occurs
}
```

## Database Operations Reference

| Operation | Server Action | Description |
|-----------|---------------|-------------|
| Read | `getData()` | Fetch all todos ordered by creation date |
| Create | `createTodo(task, priority)` | Insert a new todo item |
| Update | `updateTodo(id, completed)` | Toggle completion status |
| Delete | `deleteTodo(id)` | Remove a todo item |

## Learn More

-   [mysql2 Documentation](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js
-   [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) - Learn about Server Actions
-   [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching) - Data fetching patterns
-   [MySQL Documentation](https://dev.mysql.com/doc/) - MySQL database reference
-   [SQL Injection Prevention](https://owasp.org/www-community/attacks/SQL_Injection) - Security best practices

## Deployment

### Deploy to Vercel with PlanetScale (MySQL)

This project can be deployed to Vercel with PlanetScale for MySQL hosting. Here's how:

#### 1. Create a PlanetScale Database

1. Go to [PlanetScale](https://planetscale.com/) and sign up (free tier available)
2. Create a new database (e.g., `todo-app-nextjs`)
3. Create a password for the database
4. Get your connection string from the dashboard:
   ```
   mysql://user:password@host/dbname?sslaccept=strict
   ```

#### 2. Create the Database Schema

In the PlanetScale dashboard, open the console and run:

```sql
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium'
);
```

#### 3. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Add environment variables:
   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your PlanetScale connection string |
   | `NODE_ENV` | `production` |
5. Click **"Deploy"**

Vercel will automatically build and deploy your application.

#### Alternative MySQL Hosting Options

| Provider | Free Tier | Notes |
|----------|-----------|-------|
| [PlanetScale](https://planetscale.com/) | Yes (5GB) | Best for Vercel, excellent integration |
| [Railway](https://railway.app/) | $5 credit | Simple, supports MySQL |
| [Aiven](https://aiven.io/) | Yes (1GB) | Managed MySQL hosting |

> **Important:** When using cloud MySQL, the `ssl` option in `src/config/db.ts` is required for secure connections.
