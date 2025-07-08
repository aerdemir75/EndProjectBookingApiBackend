import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReview from "../services/reviews/deleteReviewById.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET reviews (optioneel filter op userId en/of propertyId)
router.get("/", async (req, res, next) => {
  try {
    const { userId, propertyId } = req.query;
    const reviews = await getReviews(userId, propertyId);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// GET review by ID
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);
      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

// POST new review (auth required)
router.post("/", authMiddleware, async (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;
  try {
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (err) {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ error: message });
  }
});

// PUT update review by ID (auth required)
router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId, propertyId, rating, comment } = req.body;
      const updatedReview = await updateReviewById(
        id,
        userId,
        propertyId,
        rating,
        comment
      );
      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

// DELETE review by ID (auth required)
router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedReviewId = await deleteReview(id);
      res.status(200).json({
        message: `Review with id ${deletedReviewId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
