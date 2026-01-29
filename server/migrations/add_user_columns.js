import db from '../database.js';

async function addMissingColumns() {
  try {
    console.log('Starting database migration: Adding missing user columns...');
    
    // Check which columns exist
    const [columns] = await db.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'users'
    `);
    
    const existingColumns = columns.map(col => col.COLUMN_NAME);
    console.log('Existing columns:', existingColumns);
    
    // Define columns that should exist
    const requiredColumns = [
      { name: 'phone', definition: 'VARCHAR(20)' },
      { name: 'address', definition: 'TEXT' },
      { name: 'dateOfBirth', definition: 'DATE' },
      { name: 'gender', definition: 'ENUM("male", "female", "other")' },
      { name: 'civilStatus', definition: 'ENUM("single", "married", "divorced", "widowed")' },
      { name: 'occupation', definition: 'VARCHAR(100)' },
      { name: 'createdAt', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updatedAt', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' }
    ];
    
    // Add missing columns
    for (const column of requiredColumns) {
      if (!existingColumns.includes(column.name)) {
        console.log(`Adding column: ${column.name}`);
        await db.execute(`ALTER TABLE users ADD COLUMN ${column.name} ${column.definition}`);
        console.log(`✓ Added column: ${column.name}`);
      } else {
        console.log(`✓ Column already exists: ${column.name}`);
      }
    }
    
    console.log('Database migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

export default addMissingColumns;