import prisma from "../../../prisma/prisma.js";

const getBookings = async (userId) => {
  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  const bookings = await prisma.booking.findMany({
    where: Object.keys(filter).length > 0 ? filter : undefined,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      property: {
        select: {
          id: true,
          title: true,
          location: true,
        },
      },
    },
  });

  if (!bookings || bookings.length === 0) {
    const error = new Error("No bookings found for the given criteria.");
    error.status = 404;
    throw error;
  }

  return bookings;
};

export default getBookings;
