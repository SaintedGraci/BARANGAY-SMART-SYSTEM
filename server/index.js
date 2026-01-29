import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import User from './model/user.js';
import DocumentRequest from './model/documentRequest.js';
import Announcement from './model/announcement.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Configure CORS to allow requests from the client
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add a simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is working!', 
    timestamp: new Date().toISOString() 
  });
});

app.use('/api', routes);

// Initialize database tables
const initializeDatabase = async () => {
  try {
    await User.createTable();
    await DocumentRequest.createTable();
    await Announcement.createTable();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await initializeDatabase();
});

export default app;