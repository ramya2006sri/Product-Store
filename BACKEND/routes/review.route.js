import express from 'express';
import { addReview, getReviews, updateReview, deleteReview } from '../controllers/review.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import sanitizeInput from "../middleware/sanitizeInput.js";

const router = express.Router({ mergeParams: true });

router.get('/', getReviews);
router.post('/', addReview);
router.put('/:reviewId', authMiddleware,sanitizeInput, updateReview);
router.delete('/:reviewId', authMiddleware, deleteReview);

// Only authenticated users can add reviews
router.post('/', authMiddleware,sanitizeInput, addReview);

export default router;