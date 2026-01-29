import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

// Register user controller - RESIDENTS ONLY (Public Registration)
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Combine first and last name for resident accounts
    const name = `${firstName} ${lastName}`;
    
    // Force role to be 'resident' - only municipality can create barangay accounts
    const role = 'resident';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create resident account
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Return user data in the format expected by frontend
    const userData = {
      id: user.id,
      firstName,
      lastName,
      name: user.name,
      email: user.email,
      userType: 'resident',
      role: user.role,
      createdAt: user.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'Resident account created successfully',
      user: userData
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message === 'Email already exists') {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create Barangay Account - MUNICIPALITY ADMIN ONLY (Not implemented in public routes)
export const createBarangayAccount = async (req, res) => {
  try {
    const { barangayName, email, password } = req.body;
    
    // Validate input
    if (!barangayName || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Barangay name, email, and password are required' 
      });
    }

    // Validate email format (should be like barangaytabao@municipality.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Barangay account password must be at least 8 characters long'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create barangay account
    const barangayAccount = await User.createBarangayAccount({
      barangayName,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: `Barangay account for ${barangayName} created successfully`,
      barangay: {
        id: barangayAccount.id,
        name: barangayAccount.name,
        email: barangayAccount.email,
        role: barangayAccount.role,
        createdAt: barangayAccount.createdAt
      }
    });

  } catch (error) {
    console.error('Barangay account creation error:', error);
    
    if (error.message === 'Barangay email already exists') {
      return res.status(409).json({
        success: false,
        message: 'Barangay email already registered'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Login user controller - SUPPORTS BOTH RESIDENT AND BARANGAY
export const loginUser = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user in database
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user type matches the requested login type
    if (userType === 'barangay' && !user.isBarangay()) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. This account is not authorized for barangay access.'
      });
    }

    if (userType === 'resident' && !user.isResident()) {
      return res.status(401).json({
        success: false,
        message: 'Please use the barangay login portal.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        userId: user.id, 
        email: user.email,
        role: user.role,
        isBarangay: user.isBarangay()
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Prepare user data based on account type
    let userData;
    
    if (user.isBarangay()) {
      // Barangay account data
      userData = {
        id: user.id,
        name: user.name, // e.g., "Barangay Tabao"
        email: user.email,
        userType: 'barangay',
        role: user.role,
        isBarangay: true
      };
    } else {
      // Resident account data
      const nameParts = user.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      userData = {
        id: user.id,
        firstName,
        lastName,
        name: user.name,
        email: user.email,
        userType: 'resident',
        role: user.role,
        isBarangay: false
      };
    }

    const welcomeMessage = user.isBarangay() 
      ? `Welcome to ${user.name} Dashboard` 
      : 'Welcome to Resident Portal';

    res.status(200).json({
      success: true,
      message: welcomeMessage,
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
