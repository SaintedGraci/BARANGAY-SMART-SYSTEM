import db from '../database.js';

class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name; // For residents: "John Doe", For barangays: "Barangay Tabao"
    this.email = userData.email;
    this.password = userData.password;
    this.role = userData.role; // 'resident' or 'admin' (admin = barangay entity)
    this.createdAt = userData.createdAt;
    this.updatedAt = userData.updatedAt;
  }

  // Create user table if it doesn't exist
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('resident', 'admin') DEFAULT 'resident',
        phone VARCHAR(20),
        address TEXT,
        dateOfBirth DATE,
        gender ENUM('male', 'female', 'other'),
        civilStatus ENUM('single', 'married', 'divorced', 'widowed'),
        occupation VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    try {
      await db.execute(query);
      console.log('Users table created or already exists');
    } catch (error) {
      console.error('Error creating users table:', error);
      throw error;
    }
  }

  // Create a new user (residents only through public registration)
  static async create(userData) {
    const { 
      name, 
      email, 
      password, 
      role = 'resident',
      phone,
      address,
      dateOfBirth,
      gender,
      civilStatus,
      occupation
    } = userData;
    
    const query = `
      INSERT INTO users (name, email, password, role, phone, address, dateOfBirth, gender, civilStatus, occupation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
      const [result] = await db.execute(query, [
        name, 
        email, 
        password, 
        role,
        phone || null,
        address || null,
        dateOfBirth || null,
        gender || null,
        civilStatus || null,
        occupation || null
      ]);
      return await User.findById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  // Create barangay account (municipality admin only)
  static async createBarangayAccount(barangayData) {
    const { barangayName, email, password } = barangayData;
    
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, 'admin')
    `;
    
    try {
      const [result] = await db.execute(query, [barangayName, email, password]);
      return await User.findById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Barangay email already exists');
      }
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    
    try {
      const [rows] = await db.execute(query, [email]);
      return rows.length > 0 ? new User(rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    
    try {
      const [rows] = await db.execute(query, [id]);
      return rows.length > 0 ? new User(rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  // Get all barangay accounts
  static async getAllBarangays() {
    const query = 'SELECT * FROM users WHERE role = "admin" ORDER BY name';
    
    try {
      const [rows] = await db.execute(query);
      return rows.map(row => new User(row));
    } catch (error) {
      throw error;
    }
  }

  // Update user
  async update(updateData) {
    const allowedFields = ['name', 'phone', 'address', 'dateOfBirth', 'gender', 'civilStatus', 'occupation'];
    const updates = [];
    const values = [];

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        updates.push(`${key} = ?`);
        values.push(updateData[key]);
      }
    });

    if (updates.length === 0) {
      throw new Error('No valid fields to update');
    }

    values.push(this.id);
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

    try {
      await db.execute(query, values);
      return await User.findById(this.id);
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  async delete() {
    const query = 'DELETE FROM users WHERE id = ?';
    
    try {
      await db.execute(query, [this.id]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Check if this is a barangay account
  isBarangay() {
    return this.role === 'admin';
  }

  // Check if this is a resident account
  isResident() {
    return this.role === 'resident';
  }

  // Get user data without password
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

export default User;