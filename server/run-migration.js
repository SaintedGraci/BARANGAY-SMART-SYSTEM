import addMissingColumns from './migrations/add_user_columns.js';
import db from './database.js';

async function runMigration() {
  try {
    await addMissingColumns();
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();