import db from './database.js';

async function initializeDatabase() {
  try {
    console.log('🔧 Initializing database...');
    
    // Create database if it doesn't exist
    await db.query('CREATE DATABASE IF NOT EXISTS barangay_db');
    console.log('✓ Database created/verified');
    
    // Use the database
    await db.query('USE barangay_db');
    console.log('✓ Using barangay_db');
    
    // Create users table if it doesn't exist
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await db.query(createTableSQL);
    console.log('✓ Users table created/verified');
    
    // Verify the schema
    const [rows] = await db.query('DESCRIBE users');
    console.log('\n📋 Users table schema:');
    console.table(rows);
    
    console.log('\n✅ Database initialization complete!');
    
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    process.exit(1);
  }
}

initializeDatabase();