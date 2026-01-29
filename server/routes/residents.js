import express from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user.js';
import db from '../database.js';

const router = express.Router();

// GET /api/residents - Get all resident accounts (for barangay officials)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;
    
    // Simple query without search first
    let query = 'SELECT id, name, email, role, phone, address, dateOfBirth, gender, civilStatus, occupation, createdAt, updatedAt FROM users WHERE role = ?';
    let countQuery = 'SELECT COUNT(*) as total FROM users WHERE role = ?';
    let params = ['resident'];
    let countParams = ['resident'];
    
    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ?)';
      countQuery += ' AND (name LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
      countParams.push(`%${search}%`, `%${search}%`);
    }
    
    query += ' ORDER BY createdAt DESC LIMIT ' + limit + ' OFFSET ' + offset;
    
    const [rows] = await db.execute(query, params);
    const [countResult] = await db.execute(countQuery, countParams);
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      success: true,
      message: `Found ${rows.length} resident accounts`,
      data: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching residents:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resident accounts',
      error: error.message
    });
  }
});

// POST /api/residents - Create new resident account (for barangay officials)
router.post('/', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone, 
      address, 
      dateOfBirth, 
      gender,
      civilStatus,
      occupation 
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, email, and password are required'
      });
    }

    // Check if email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create full name
    const fullName = `${firstName} ${lastName}`;

    // Create resident with all fields
    const newResident = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
      role: 'resident',
      phone,
      address,
      dateOfBirth,
      gender,
      civilStatus,
      occupation
    });

    res.status(201).json({
      success: true,
      message: 'Resident account created successfully',
      data: newResident.toJSON()
    });
  } catch (error) {
    console.error('Error creating resident:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create resident account',
      error: error.message
    });
  }
});

// GET /api/residents/:id - Get specific resident by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Resident not found'
      });
    }

    if (!user.isResident()) {
      return res.status(400).json({
        success: false,
        message: 'User is not a resident'
      });
    }

    res.json({
      success: true,
      message: 'Resident found',
      data: user.toJSON()
    });
  } catch (error) {
    console.error('Error fetching resident by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resident',
      error: error.message
    });
  }
});

// PUT /api/residents/:id - Update resident information
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = await User.findById(id);
    if (!user || !user.isResident()) {
      return res.status(404).json({
        success: false,
        message: 'Resident not found'
      });
    }

    // Update user
    const updatedUser = await user.update(updateData);

    res.json({
      success: true,
      message: 'Resident updated successfully',
      data: updatedUser.toJSON()
    });
  } catch (error) {
    console.error('Error updating resident:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update resident',
      error: error.message
    });
  }
});

// DELETE /api/residents/:id - Delete resident account
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user || !user.isResident()) {
      return res.status(404).json({
        success: false,
        message: 'Resident not found'
      });
    }

    await user.delete();

    res.json({
      success: true,
      message: 'Resident account deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting resident:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete resident',
      error: error.message
    });
  }
});

// GET /api/residents/stats/summary - Get resident statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const queries = {
      total: 'SELECT COUNT(*) as count FROM users WHERE role = "resident"',
      thisMonth: `SELECT COUNT(*) as count FROM users WHERE role = "resident" AND MONTH(createdAt) = MONTH(CURRENT_DATE()) AND YEAR(createdAt) = YEAR(CURRENT_DATE())`,
      thisWeek: `SELECT COUNT(*) as count FROM users WHERE role = "resident" AND YEARWEEK(createdAt, 1) = YEARWEEK(CURRENT_DATE(), 1)`,
      today: `SELECT COUNT(*) as count FROM users WHERE role = "resident" AND DATE(createdAt) = CURRENT_DATE()`
    };

    const results = {};
    for (const [key, query] of Object.entries(queries)) {
      const [rows] = await db.execute(query);
      results[key] = rows[0].count;
    }

    res.json({
      success: true,
      message: 'Resident statistics retrieved successfully',
      data: results
    });
  } catch (error) {
    console.error('Error fetching resident stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resident statistics',
      error: error.message
    });
  }
});

export default router;