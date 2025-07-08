import prisma from "../../../prisma/prisma.js";
import { z } from "zod";
import { CreateBookingSchema } from "../../utils/schema.js";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  try {
    const validatedData = CreateBookingSchema.parse({
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });
    return prisma.booking.create({
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

export default createBooking;
