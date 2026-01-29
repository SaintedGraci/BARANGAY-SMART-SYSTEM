import User from './model/user.js';
import Announcement from './model/announcement.js';
import DocumentRequest from './model/documentRequest.js';
import bcrypt from 'bcrypt';

async function seedData() {
  try {
    console.log('Starting data seeding...');

    // Create a barangay admin user if it doesn't exist
    let adminUser = await User.findByEmail('admin@barangay.gov.ph');
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        name: 'Barangay Administrator',
        email: 'admin@barangay.gov.ph',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✓ Created admin user');
    }

    // Create sample announcements
    const sampleAnnouncements = [
      {
        title: 'Community Clean-up Drive',
        content: 'Join us this Saturday for our monthly environmental campaign. Bring your own cleaning materials and help keep our barangay clean and green.',
        type: 'event',
        priority: 'high',
        eventDate: '2024-02-03',
        eventTime: '08:00:00',
        location: 'Barangay Hall',
        createdBy: adminUser.id
      },
      {
        title: 'Free Medical Check-up',
        content: 'The Municipal Health Center will be offering free medical consultations and basic health screening for all residents.',
        type: 'health',
        priority: 'medium',
        eventDate: '2024-02-05',
        eventTime: '09:00:00',
        location: 'Health Center',
        createdBy: adminUser.id
      },
      {
        title: 'Water Service Interruption',
        content: 'Scheduled maintenance will cause water service interruption in selected areas. Please store water in advance.',
        type: 'notice',
        priority: 'high',
        eventDate: '2024-02-01',
        eventTime: '06:00:00',
        location: 'Zone 1-3',
        createdBy: adminUser.id
      },
      {
        title: 'Barangay Assembly Meeting',
        content: 'Monthly barangay assembly meeting to discuss community issues and upcoming projects. All residents are welcome to attend.',
        type: 'event',
        priority: 'medium',
        eventDate: '2024-02-10',
        eventTime: '14:00:00',
        location: 'Barangay Hall',
        createdBy: adminUser.id
      },
      {
        title: 'Senior Citizens Benefits Distribution',
        content: 'Distribution of quarterly benefits for senior citizens. Please bring valid ID and senior citizen card.',
        type: 'general',
        priority: 'medium',
        eventDate: '2024-02-07',
        eventTime: '10:00:00',
        location: 'Barangay Office',
        createdBy: adminUser.id
      }
    ];

    for (const announcementData of sampleAnnouncements) {
      await Announcement.create(announcementData);
    }
    console.log('✓ Created sample announcements');

    console.log('Data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Run the seeding
seedData();