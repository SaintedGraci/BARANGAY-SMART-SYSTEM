import express from 'express';
import DocumentRequest from '../model/documentRequest.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/documents/types - Get available document types (public)
router.get('/types', async (req, res) => {
  try {
    const documentTypes = DocumentRequest.getDocumentTypes();
    
    res.json({
      success: true,
      message: 'Document types retrieved successfully',
      data: documentTypes
    });
  } catch (error) {
    console.error('Error fetching document types:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch document types',
      error: error.message
    });
  }
});

// GET /api/documents/my-requests - Get current user's document requests
router.get('/my-requests', authenticateToken, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const requests = await DocumentRequest.getByUserId(req.user.id, parseInt(limit));
    
    res.json({
      success: true,
      message: `Found ${requests.length} document requests`,
      data: requests
    });
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your document requests',
      error: error.message
    });
  }
});

// GET /api/documents/requests - Get all document requests (admin only)
router.get('/requests', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin (barangay official)
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const { page = 1, limit = 10, status, search, documentType } = req.query;
    const offset = (page - 1) * limit;
    
    const filters = {
      limit: parseInt(limit),
      offset: parseInt(offset)
    };
    
    if (status) filters.status = status;
    if (search) filters.search = search;
    if (documentType) filters.documentType = documentType;
    
    const requests = await DocumentRequest.getAll(filters);
    
    // Get total count for pagination
    const totalQuery = await DocumentRequest.getAll({ ...filters, limit: null, offset: null });
    const total = totalQuery.length;
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      success: true,
      message: `Found ${requests.length} document requests`,
      data: requests,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalRecords: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching document requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch document requests',
      error: error.message
    });
  }
});

// GET /api/documents/requests/pending - Get pending requests (admin only)
router.get('/requests/pending', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const requests = await DocumentRequest.getAll({ status: 'pending' });
    
    res.json({
      success: true,
      message: `Found ${requests.length} pending requests`,
      data: requests
    });
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending requests',
      error: error.message
    });
  }
});

// GET /api/documents/requests/:id - Get specific document request
router.get('/requests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const request = await DocumentRequest.findById(id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Document request not found'
      });
    }

    // Check if user owns this request or is admin
    if (request.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own requests.'
      });
    }

    res.json({
      success: true,
      message: 'Document request found',
      data: request
    });
  } catch (error) {
    console.error('Error fetching document request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch document request',
      error: error.message
    });
  }
});

// POST /api/documents/requests - Create new document request
router.post('/requests', authenticateToken, async (req, res) => {
  try {
    const { documentType, purpose, priority, requestData } = req.body;

    // Validation
    if (!documentType) {
      return res.status(400).json({
        success: false,
        message: 'Document type is required'
      });
    }

    // Get document type info to set fee
    const documentTypes = DocumentRequest.getDocumentTypes();
    const docType = documentTypes.find(type => type.type === documentType);
    
    if (!docType) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document type'
      });
    }

    const newRequest = await DocumentRequest.create({
      userId: req.user.id,
      documentType,
      purpose,
      priority: priority || 'medium',
      requestData: requestData || {},
      fee: docType.fee
    });

    res.status(201).json({
      success: true,
      message: 'Document request created successfully',
      data: newRequest
    });
  } catch (error) {
    console.error('Error creating document request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create document request',
      error: error.message
    });
  }
});

// PUT /api/documents/requests/:id/status - Update request status (admin only)
router.put('/requests/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const { id } = req.params;
    const { status, remarks } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const request = await DocumentRequest.findById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Document request not found'
      });
    }

    const updatedRequest = await request.updateStatus(status, remarks, req.user.id);

    res.json({
      success: true,
      message: 'Request status updated successfully',
      data: updatedRequest
    });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update request status',
      error: error.message
    });
  }
});

// PUT /api/documents/requests/:id/approve - Approve request (admin only)
router.put('/requests/:id/approve', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const { id } = req.params;
    const { remarks } = req.body;

    const request = await DocumentRequest.findById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Document request not found'
      });
    }

    const updatedRequest = await request.updateStatus('approved', remarks, req.user.id);

    res.json({
      success: true,
      message: 'Request approved successfully',
      data: updatedRequest
    });
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve request',
      error: error.message
    });
  }
});

// PUT /api/documents/requests/:id/reject - Reject request (admin only)
router.put('/requests/:id/reject', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }

    const request = await DocumentRequest.findById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Document request not found'
      });
    }

    const updatedRequest = await request.updateStatus('rejected', reason, req.user.id);

    res.json({
      success: true,
      message: 'Request rejected successfully',
      data: updatedRequest
    });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject request',
      error: error.message
    });
  }
});

// GET /api/documents/statistics - Get document statistics
router.get('/statistics', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.role === 'admin' ? null : req.user.id;
    const stats = await DocumentRequest.getStatistics(userId);
    
    res.json({
      success: true,
      message: 'Statistics retrieved successfully',
      data: stats
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

// DELETE /api/documents/requests/:id - Delete request (user can delete own pending requests)
router.delete('/requests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const request = await DocumentRequest.findById(id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Document request not found'
      });
    }

    // Check permissions
    if (request.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own requests.'
      });
    }

    // Only allow deletion of pending requests
    if (request.status !== 'pending' && req.user.role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Only pending requests can be deleted'
      });
    }

    await request.delete();

    res.json({
      success: true,
      message: 'Document request deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete request',
      error: error.message
    });
  }
});

export default router;