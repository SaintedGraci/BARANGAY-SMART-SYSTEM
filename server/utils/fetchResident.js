import User from '../model/user.js';
import db from '../database.js';

// Function to fetch all resident accounts
async function fetchAllResidents() {
  try {
    const query = 'SELECT * FROM users WHERE role = "resident" ORDER BY createdAt DESC';
    const [rows] = await db.execute(query);
    
    if (rows.length === 0) {
      console.log('No resident accounts found in the database.');
      return [];
    }

    console.log(`Found ${rows.length} resident account(s):`);
    console.log('=====================================');
    
    rows.forEach((user, index) => {
      console.log(`\n${index + 1}. Resident Account:`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log(`   Updated: ${user.updatedAt}`);
    });

    return rows;
  } catch (error) {
    console.error('Error fetching residents:', error.message);
    throw error;
  }
}

// Function to fetch a specific resident by email
async function fetchResidentByEmail(email) {
  try {
    const user = await User.findByEmail(email);
    
    if (!user) {
      console.log(`No resident found with email: ${email}`);
      return null;
    }

    if (!user.isResident()) {
      console.log(`User with email ${email} is not a resident (role: ${user.role})`);
      return null;
    }

    console.log('Resident Account Found:');
    console.log('======================');
    console.log(`ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log(`Created: ${user.createdAt}`);
    console.log(`Updated: ${user.updatedAt}`);

    return user;
  } catch (error) {
    console.error('Error fetching resident by email:', error.message);
    throw error;
  }
}

// Function to create a sample resident account for testing
async function createSampleResident() {
  try {
    const sampleResident = {
      name: 'Juan Dela Cruz',
      email: 'juan.delacruz@email.com',
      password: '$2b$10$hashedPasswordHere', // This should be properly hashed
      role: 'resident'
    };

    // Check if resident already exists
    const existingUser = await User.findByEmail(sampleResident.email);
    if (existingUser) {
      console.log('Sample resident already exists:');
      console.log(`Name: ${existingUser.name}`);
      console.log(`Email: ${existingUser.email}`);
      return existingUser;
    }

    // Create new resident
    const newResident = await User.create(sampleResident);
    console.log('Sample resident created successfully:');
    console.log(`ID: ${newResident.id}`);
    console.log(`Name: ${newResident.name}`);
    console.log(`Email: ${newResident.email}`);
    
    return newResident;
  } catch (error) {
    console.error('Error creating sample resident:', error.message);
    throw error;
  }
}

// Main execution function
async function main() {
  try {
    console.log('🔍 Fetching Resident Accounts from Database...\n');
    
    // First, try to fetch all residents
    const residents = await fetchAllResidents();
    
    if (residents.length === 0) {
      console.log('\n📝 No residents found. Creating a sample resident account...');
      await createSampleResident();
      
      // Fetch again after creating sample
      console.log('\n🔍 Fetching residents again...');
      await fetchAllResidents();
    }

    // Example: Fetch specific resident by email
    console.log('\n🎯 Example: Fetching specific resident by email...');
    await fetchResidentByEmail('juan.delacruz@email.com');

  } catch (error) {
    console.error('❌ Error in main execution:', error.message);
  } finally {
    // Close database connection
    await db.end();
    console.log('\n✅ Database connection closed.');
  }
}

// Export functions for use in other files
export {
  fetchAllResidents,
  fetchResidentByEmail,
  createSampleResident
};

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}