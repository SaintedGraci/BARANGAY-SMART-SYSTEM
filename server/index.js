import express from 'express';
import cors from 'cors';
import db from './database.js'; // Import your new file

const app = express();

// Configure CORS to allow requests from the client origin
const corsOptions = {
  origin: 'http://localhost:5173', // Assuming Vite runs on port 5173 by default
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user exists with that email, password, AND role
    const [users] = await db.query(
      "SELECT id, name, email, role FROM users WHERE email = ? AND password = ? AND role = ?", 
      [email, password, role]
    );

    if (users.length > 0) {
      // If user exists
      res.status(200).json({ 
        success: true, 
        message: "Login successful", 
        user: users[0] 
      });
    } else {
      // If user doesn't exist or wrong password
      res.status(401).json({ 
        success: false, 
        message: "Account not found or invalid credentials" 
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});





const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));