# Next.js MySQL Connection Tutorial

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), demonstrating how to connect to a MySQL database using mysql2.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Urbanist](https://fonts.google.com/specimen/Urbanist) and [Poppins](https://fonts.google.com/specimen/Poppins) fonts. It also uses [Tailwind CSS](https://tailwindcss.com) for styling.

## Connecting to MySQL

This tutorial shows how to connect your Next.js application to a MySQL database using the mysql2 library.

### Prerequisites

-   Node.js installed

-   MySQL server running

-   A MySQL database created

### Installation

Install the mysql2 package:

```bash
npm install mysql2
```

### Environment Variables

Create a `.env.local` file in the root directory and add your database credentials:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306
```

### Creating a Database Connection

Create a file `lib/db.js` (or `lib/db.ts` for TypeScript) with the following content:

```javascript
import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

export default db;
```

### Using the Connection

You can now use the `db` object to execute queries in your API routes or server components.

Example in an API route (`app/api/example/route.js`):

```javascript
import db from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [rows] = await db.execute("SELECT * FROM your_table");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
