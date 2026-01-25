import mysql from 'mysql2/promise'; // or 'pg' for postgres
import dotenv from 'dotenv';

dotenv.config(); // Load the vault!

// Create the connection "Pool" (the physical cable)
const db = mysql.createPool({
  host: process.env.DB_HOST,     // Secret address
  user: process.env.DB_USER,     // Secret name
  password: process.env.DB_PASSWORD, // Secret password
  database: process.env.DB_NAME, // Which box to open
  port: process.env.DB_PORT || 3306
});

// Test the connection
try {
  await db.getConnection();
  console.log("Connected to the Database!");
} catch (err) {
  console.log("Database connection failed:", err.message);
}

export default db;