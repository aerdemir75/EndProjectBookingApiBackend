import prisma from "../../../prisma/prisma.js";
import { z } from "zod";
import { CreateReviewSchema } from "../../utils/schema.js";

const createReview = async (userId, propertyId, rating, comment) => {
  try {
    const validatedData = CreateReviewSchema.parse({
      userId,
      propertyId,
      rating,
      comment,
    });
    return prisma.review.create({
      data: validatedData,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const message = err.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");
      const error = new Error(message);
      error.status = 400;
      throw error;
    } else {
      const err = new Error("Internal Server Error");
      err.status = 500;
      throw err;
    }
  }
};

export default createReview;
