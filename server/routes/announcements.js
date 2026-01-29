import express from 'express';
import Announcement from '../model/announcement.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/announcements - Get all active announcements (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, priority, search } = req.query;
    const offset = (page - 1) * limit;
    
    const filters = {
      limit: parseInt(limit),
      offset: parseInt(offset)
    };
    
    if (type) filters.type = type;
    if (priority) filters.priority = priority;
    if (search) filters.search = search;
    
    const announcements = await Announcement.getAll(filters);
    
    // Get total count for pagination
    const totalQuery = await Announcement.getAll({ ...filters, limit: null, offset: null });
    const total = totalQuery.length;
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      success: true,
      message: `Found ${announcements.length} announcements`,
      data: announcements,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalRecords: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements',
      error: error.message
    });
  }
});

// GET /api/announcements/recent - Get recent announcements
router.get('/recent', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const announcements = await Announcement.getRecent(parseInt(limit));
    
    res.json({
      success: true,
      message: `Found ${announcements.length} recent announcements`,
      data: announcements
    });
  } catch (error) {
    console.error('Error fetching recent announcements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent announcements',
      error: error.message
    });
  }
});

// GET /api/announcements/:id - Get specific announcement
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findById(id);
    
    if (!announcement || !announcement.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      message: 'Announcement found',
      data: announcement
    });
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcement',
      error: error.message
    });
  }
});

// POST /api/announcements - Create new announcement (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, content, type, priority, eventDate, eventTime, location } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const newAnnouncement = await Announcement.create({
      title,
      content,
      type: type || 'general',
      priority: priority || 'medium',
      eventDate,
      eventTime,
      location,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: newAnnouncement
    });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create announcement',
      error: error.message
    });
  }
});

// PUT /api/announcements/:id - Update announcement (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    const updatedAnnouncement = await announcement.update(updateData);

    res.json({
      success: true,
      message: 'Announcement updated successfully',
      data: updatedAnnouncement
    });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update announcement',
      error: error.message
    });
  }
});

// DELETE /api/announcements/:id - Delete announcement (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    await announcement.delete();

    res.json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete announcement',
      error: error.message
    });
  }
});

export default router;