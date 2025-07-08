import prisma from "../../../prisma/prisma.js";
import NotFoundError from "../../errors/notFoundError.js";

const deleteBooking = async (id) => {
  const deleteBooking = await prisma.booking.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteBooking || deleteBooking.count === 0) {
    throw new NotFoundError("Booking", id);
  }

  return id;
};
export default deleteBooking;
