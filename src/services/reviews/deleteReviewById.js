import prisma from "../../../prisma/prisma.js";
import NotFoundError from "../../errors/notFoundError.js";

const deleteReview = async (id) => {
  const deleteReview = await prisma.review.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteReview || deleteReview.count === 0) {
    throw new NotFoundError("Review", id);
  }

  return id;
};
export default deleteReview;
