# Next.js with MySQL2 Connection Tutorial

This repository demonstrates how to connect a Next.js application to a MySQL database using the `mysql2` package. This is a step-by-step tutorial covering database connection, configuration, and basic operations.

## Features

- Next.js 14+ with App Router
- MySQL database integration using `mysql2`
- Environment configuration for database credentials
- Basic database operations (SELECT, INSERT, UPDATE, DELETE)
- Connection pooling for better performance
- Error handling for database operations

## Prerequisites

- Node.js 18+
- MySQL Server
- A MySQL database with appropriate credentials

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Huzaifa4412/nextjs-connect-with-mysql.git
cd nextjs-connect-with-mysql
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up your MySQL database and create a `.env.local` file with your database credentials:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── db/           # Database connection examples
│   ├── components/       # Reusable components
│   └── lib/              # Database utilities
└── pages/                # Additional pages if needed
```

## Key Components

- `src/lib/db.js`: Database connection configuration using mysql2
- `src/app/api/db/route.js`: Example API routes demonstrating database operations
- `.env.local`: Environment variables for database configuration

## Learn More

To learn more about Next.js and MySQL integration:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [mysql2 Documentation](https://www.npmjs.com/package/mysql2) - official mysql2 package documentation
- [MySQL Documentation](https://dev.mysql.com/doc/) - official MySQL documentation

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
