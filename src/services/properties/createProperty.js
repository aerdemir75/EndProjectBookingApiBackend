import prisma from "../../../prisma/prisma.js";
import { z } from "zod";
import { CreatePropertySchema } from "../../utils/schema.js";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  try {
    const validatedData = CreatePropertySchema.parse({
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });
    return prisma.property.create({
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

export default createProperty;
