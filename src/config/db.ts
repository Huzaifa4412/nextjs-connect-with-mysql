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