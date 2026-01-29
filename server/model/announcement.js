import db from '../database.js';

class Announcement {
  constructor(announcementData) {
    this.id = announcementData.id;
    this.title = announcementData.title;
    this.content = announcementData.content;
    this.type = announcementData.type;
    this.priority = announcementData.priority;
    this.eventDate = announcementData.eventDate;
    this.eventTime = announcementData.eventTime;
    this.location = announcementData.location;
    this.createdBy = announcementData.createdBy;
    this.isActive = announcementData.isActive;
    this.createdAt = announcementData.createdAt;
    this.updatedAt = announcementData.updatedAt;
  }

  // Create announcements table
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS announcements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        type ENUM('event', 'notice', 'health', 'emergency', 'general') DEFAULT 'general',
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        eventDate DATE,
        eventTime TIME,
        location VARCHAR(255),
        createdBy INT NOT NULL,
        isActive BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    
    try {
      await db.execute(query);
      console.log('Announcements table created or already exists');
    } catch (error) {
      console.error('Error creating announcements table:', error);
      throw error;
    }
  }

  // Create new announcement
  static async create(announcementData) {
    const query = `
      INSERT INTO announcements (
        title, content, type, priority, eventDate, eventTime, location, createdBy
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
      const [result] = await db.execute(query, [
        announcementData.title,
        announcementData.content,
        announcementData.type || 'general',
        announcementData.priority || 'medium',
        announcementData.eventDate || null,
        announcementData.eventTime || null,
        announcementData.location || null,
        announcementData.createdBy
      ]);
      
      return await Announcement.findById(result.insertId);
    } catch (error) {
      throw error;
    }
  }

  // Find announcement by ID
  static async findById(id) {
    const query = `
      SELECT a.*, u.name as creatorName
      FROM announcements a
      LEFT JOIN users u ON a.createdBy = u.id
      WHERE a.id = ?
    `;
    
    try {
      const [rows] = await db.execute(query, [id]);
      if (rows.length === 0) return null;
      
      const announcement = new Announcement(rows[0]);
      announcement.creatorName = rows[0].creatorName;
      return announcement;
    } catch (error) {
      throw error;
    }
  }

  // Get all announcements with filters
  static async getAll(filters = {}) {
    let query = `
      SELECT a.*, u.name as creatorName
      FROM announcements a
      LEFT JOIN users u ON a.createdBy = u.id
      WHERE a.isActive = TRUE
    `;
    const params = [];

    if (filters.type) {
      query += ' AND a.type = ?';
      params.push(filters.type);
    }

    if (filters.priority) {
      query += ' AND a.priority = ?';
      params.push(filters.priority);
    }

    if (filters.search) {
      query += ' AND (a.title LIKE ? OR a.content LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY a.priority DESC, a.createdAt DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(parseInt(filters.limit));
      
      if (filters.offset) {
        query += ' OFFSET ?';
        params.push(parseInt(filters.offset));
      }
    }

    try {
      const [rows] = await db.execute(query, params);
      return rows.map(row => {
        const announcement = new Announcement(row);
        announcement.creatorName = row.creatorName;
        return announcement;
      });
    } catch (error) {
      throw error;
    }
  }

  // Get recent announcements
  static async getRecent(limit = 5) {
    const query = `
      SELECT a.*, u.name as creatorName
      FROM announcements a
      LEFT JOIN users u ON a.createdBy = u.id
      WHERE a.isActive = TRUE
      ORDER BY a.createdAt DESC
      LIMIT ${parseInt(limit)}
    `;
    
    try {
      const [rows] = await db.execute(query);
      return rows.map(row => {
        const announcement = new Announcement(row);
        announcement.creatorName = row.creatorName;
        return announcement;
      });
    } catch (error) {
      throw error;
    }
  }

  // Update announcement
  async update(updateData) {
    const allowedFields = ['title', 'content', 'type', 'priority', 'eventDate', 'eventTime', 'location', 'isActive'];
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
    const query = `UPDATE announcements SET ${updates.join(', ')}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;

    try {
      await db.execute(query, values);
      return await Announcement.findById(this.id);
    } catch (error) {
      throw error;
    }
  }

  // Delete announcement (soft delete)
  async delete() {
    const query = 'UPDATE announcements SET isActive = FALSE WHERE id = ?';
    
    try {
      await db.execute(query, [this.id]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Hard delete announcement
  async hardDelete() {
    const query = 'DELETE FROM announcements WHERE id = ?';
    
    try {
      await db.execute(query, [this.id]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Convert to JSON
  toJSON() {
    return { ...this };
  }
}

export default Announcement;