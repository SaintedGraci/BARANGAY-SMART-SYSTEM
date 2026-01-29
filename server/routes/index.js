import express from 'express';
import authRoutes from './auth.js';
import residentsRoutes from './residents.js';
import documentsRoutes from './documents.js';
import announcementsRoutes from './announcements.js';

const router = express.Router();

// Mount auth routes
router.use('/auth', authRoutes);

// Mount residents routes
router.use('/residents', residentsRoutes);

// Mount documents routes
router.use('/documents', documentsRoutes);

// Mount announcements routes
router.use('/announcements', announcementsRoutes);

export default router;