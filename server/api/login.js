// Vercel Serverless Function for Login
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : null
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle OPTIONS request for preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, password, role } = req.body;

    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    // Check if the user exists with that email, password, AND role
    const [users] = await connection.execute(
      "SELECT id, name, email, role FROM users WHERE email = ? AND password = ? AND role = ?",
      [email, password, role]
    );

    await connection.end();

    if (users.length > 0) {
      // If user exists
      return res.status(200).json({ 
        success: true, 
        message: "Login successful", 
        user: users[0] 
      });
    } else {
      // If user doesn't exist or wrong password
      return res.status(401).json({ 
        success: false, 
        message: "Account not found or invalid credentials" 
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}