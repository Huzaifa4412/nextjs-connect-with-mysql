import { pool } from "../src/config/db";

async function migrate() {
  const connection = await pool.getConnection();
  try {
    console.log("Checking database schema...");
    
    // Check if priority column exists
    const [columns] = await connection.execute(
      "SHOW COLUMNS FROM todos LIKE 'priority'"
    );

    if ((columns as any[]).length === 0) {
      console.log("Adding priority column...");
      await connection.execute(
        "ALTER TABLE todos ADD COLUMN priority ENUM('low', 'medium', 'high') DEFAULT 'medium'"
      );
      console.log("Priority column added.");
    } else {
      console.log("Priority column already exists.");
    }

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    connection.release();
    process.exit();
  }
}

migrate();
