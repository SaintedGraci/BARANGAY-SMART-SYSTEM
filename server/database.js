import mysql from 'mysql2/promise'; // Using promise version for modern async/await
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || 'YOUR_WORKBENCH_PASSWORD', // The password you set when installing MySQL
  database: process.env.DB_NAME || 'barangay_db',
  port: process.env.DB_PORT || 3306 // Default MySQL port
});

export default db;