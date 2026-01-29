import db from '../database.js';

class DocumentRequest {
  constructor(requestData) {
    this.id = requestData.id;
    this.userId = requestData.userId;
    this.documentType = requestData.documentType;
    this.purpose = requestData.purpose;
    this.status = requestData.status || 'pending';
    this.priority = requestData.priority || 'medium';
    this.requestData = requestData.requestData;
    this.remarks = requestData.remarks;
    this.approvedBy = requestData.approvedBy;
    this.approvedAt = requestData.approvedAt;
    this.completedAt = requestData.completedAt;
    this.trackingNumber = requestData.trackingNumber;
    this.fee = requestData.fee;
    this.createdAt = requestData.createdAt;
    this.updatedAt = requestData.updatedAt;
  }

  // Create document requests table
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS document_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        documentType VARCHAR(100) NOT NULL,
        purpose TEXT,
        status ENUM('pending', 'processing', 'approved', 'rejected', 'completed') DEFAULT 'pending',
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        requestData JSON,
        remarks TEXT,
        approvedBy INT,
        approvedAt TIMESTAMP NULL,
        completedAt TIMESTAMP NULL,
        trackingNumber VARCHAR(50) UNIQUE,
        fee DECIMAL(10,2) DEFAULT 0.00,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (approvedBy) REFERENCES users(id) ON DELETE SET NULL
      )
    `;
    
    try {
      await db.execute(query);
      console.log('Document requests table created or already exists');
    } catch (error) {
      console.error('Error creating document requests table:', error);
      throw error;
    }
  }

  // Generate tracking number
  static generateTrackingNumber(documentType) {
    const prefix = documentType.substring(0, 2).toUpperCase();
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${year}-${random}`;
  }

  // Create new document request
  static async create(requestData) {
    const trackingNumber = this.generateTrackingNumber(requestData.documentType);
    
    const query = `
      INSERT INTO document_requests (
        userId, documentType, purpose, priority, requestData, trackingNumber, fee
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
      const [result] = await db.execute(query, [
        requestData.userId,
        requestData.documentType,
        requestData.purpose || null,
        requestData.priority || 'medium',
        JSON.stringify(requestData.requestData || {}),
        trackingNumber,
        requestData.fee || 0.00
      ]);
      
      return await DocumentRequest.findById(result.insertId);
    } catch (error) {
      throw error;
    }
  }

  // Find request by ID
  static async findById(id) {
    const query = `
      SELECT dr.*, u.name as userName, u.email as userEmail,
             approver.name as approverName
      FROM document_requests dr
      LEFT JOIN users u ON dr.userId = u.id
      LEFT JOIN users approver ON dr.approvedBy = approver.id
      WHERE dr.id = ?
    `;
    
    try {
      const [rows] = await db.execute(query, [id]);
      if (rows.length === 0) return null;
      
      const request = new DocumentRequest(rows[0]);
      request.userName = rows[0].userName;
      request.userEmail = rows[0].userEmail;
      request.approverName = rows[0].approverName;
      
      return request;
    } catch (error) {
      throw error;
    }
  }

  // Get all requests with filters
  static async getAll(filters = {}) {
    let query = `
      SELECT dr.*, u.name as userName, u.email as userEmail,
             approver.name as approverName
      FROM document_requests dr
      LEFT JOIN users u ON dr.userId = u.id
      LEFT JOIN users approver ON dr.approvedBy = approver.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      query += ' AND dr.status = ?';
      params.push(filters.status);
    }

    if (filters.userId) {
      query += ' AND dr.userId = ?';
      params.push(filters.userId);
    }

    if (filters.documentType) {
      query += ' AND dr.documentType = ?';
      params.push(filters.documentType);
    }

    if (filters.search) {
      query += ' AND (dr.trackingNumber LIKE ? OR u.name LIKE ? OR dr.documentType LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY dr.createdAt DESC';

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
        const request = new DocumentRequest(row);
        request.userName = row.userName;
        request.userEmail = row.userEmail;
        request.approverName = row.approverName;
        return request;
      });
    } catch (error) {
      throw error;
    }
  }

  // Get user's requests
  static async getByUserId(userId, limit = 10) {
    const query = `
      SELECT dr.*, approver.name as approverName
      FROM document_requests dr
      LEFT JOIN users approver ON dr.approvedBy = approver.id
      WHERE dr.userId = ?
      ORDER BY dr.createdAt DESC
      LIMIT ?
    `;
    
    try {
      const [rows] = await db.execute(query, [userId, limit]);
      return rows.map(row => {
        const request = new DocumentRequest(row);
        request.approverName = row.approverName;
        return request;
      });
    } catch (error) {
      throw error;
    }
  }

  // Update request status
  async updateStatus(status, remarks = null, approvedBy = null) {
    let query = 'UPDATE document_requests SET status = ?, remarks = ?, updatedAt = CURRENT_TIMESTAMP';
    const params = [status, remarks];

    if (status === 'approved' && approvedBy) {
      query += ', approvedBy = ?, approvedAt = CURRENT_TIMESTAMP';
      params.push(approvedBy);
    }

    if (status === 'completed') {
      query += ', completedAt = CURRENT_TIMESTAMP';
    }

    query += ' WHERE id = ?';
    params.push(this.id);

    try {
      await db.execute(query, params);
      return await DocumentRequest.findById(this.id);
    } catch (error) {
      throw error;
    }
  }

  // Get statistics
  static async getStatistics(userId = null) {
    let baseQuery = 'SELECT COUNT(*) as count FROM document_requests';
    let whereClause = userId ? ' WHERE userId = ?' : '';
    
    const queries = {
      total: baseQuery + whereClause,
      pending: baseQuery + whereClause + (userId ? ' AND' : ' WHERE') + ' status = "pending"',
      processing: baseQuery + whereClause + (userId ? ' AND' : ' WHERE') + ' status = "processing"',
      approved: baseQuery + whereClause + (userId ? ' AND' : ' WHERE') + ' status = "approved"',
      completed: baseQuery + whereClause + (userId ? ' AND' : ' WHERE') + ' status = "completed"',
      rejected: baseQuery + whereClause + (userId ? ' AND' : ' WHERE') + ' status = "rejected"',
      thisMonth: baseQuery + whereClause + (userId ? ' AND' : ' WHERE') + ' MONTH(createdAt) = MONTH(CURRENT_DATE()) AND YEAR(createdAt) = YEAR(CURRENT_DATE())',
      thisWeek: baseQuery + whereClause + (userId ? ' AND' : ' WHERE') + ' YEARWEEK(createdAt, 1) = YEARWEEK(CURRENT_DATE(), 1)',
      today: baseQuery + whereClause + (userId ? ' AND' : ' WHERE') + ' DATE(createdAt) = CURRENT_DATE()'
    };

    try {
      const results = {};
      for (const [key, query] of Object.entries(queries)) {
        const params = userId ? [userId] : [];
        const [rows] = await db.execute(query, params);
        results[key] = rows[0].count;
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Delete request
  async delete() {
    const query = 'DELETE FROM document_requests WHERE id = ?';
    
    try {
      await db.execute(query, [this.id]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get document types with fees
  static getDocumentTypes() {
    return [
      {
        type: 'Barangay Clearance',
        description: 'Certificate for legal and employment purposes',
        fee: 50.00,
        processingTime: '3-5 business days',
        requirements: ['Valid ID', 'Proof of Residency']
      },
      {
        type: 'Certificate of Indigency',
        description: 'For financial assistance and scholarship applications',
        fee: 0.00,
        processingTime: '2-3 business days',
        requirements: ['Valid ID', 'Proof of Income']
      },
      {
        type: 'Business Permit',
        description: 'License to operate business within the barangay',
        fee: 200.00,
        processingTime: '7-10 business days',
        requirements: ['Business Registration', 'Valid ID', 'Location Map']
      },
      {
        type: 'Residency Certificate',
        description: 'Proof of residence in the barangay',
        fee: 30.00,
        processingTime: '1-2 business days',
        requirements: ['Valid ID', 'Utility Bill']
      },
      {
        type: 'Certificate of Good Moral',
        description: 'Character certificate for employment or school',
        fee: 25.00,
        processingTime: '2-3 business days',
        requirements: ['Valid ID', 'Proof of Residency']
      }
    ];
  }

  // Convert to JSON (exclude sensitive data)
  toJSON() {
    const { ...requestData } = this;
    if (typeof requestData.requestData === 'string') {
      try {
        requestData.requestData = JSON.parse(requestData.requestData);
      } catch (e) {
        // Keep as string if parsing fails
      }
    }
    return requestData;
  }
}

export default DocumentRequest;