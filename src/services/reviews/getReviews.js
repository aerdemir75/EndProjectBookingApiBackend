import prisma from "../../../prisma/prisma.js";

const getReviews = async (userId, propertyId) => {
  const filters = {};

  if (userId) {
    filters.userId = userId;
  }

  if (propertyId) {
    filters.propertyId = propertyId;
  }

  const reviews = await prisma.review.findMany({
    where: Object.keys(filters).length > 0 ? filters : undefined,
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      property: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!reviews || reviews.length === 0) {
    const error = new Error("No reviews found matching the given criteria.");
    error.status = 404;
    throw error;
  }

  return reviews;
};

export default getReviews;
