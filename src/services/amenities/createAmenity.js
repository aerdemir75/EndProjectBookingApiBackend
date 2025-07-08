import prisma from "../../../prisma/prisma.js";
import { z } from "zod";
import { CreateAmenitySchema } from "../../utils/schema.js";

const createAmenity = async (name) => {
  try {
    const validatedData = CreateAmenitySchema.parse({
      name,
    });
    return prisma.amenity.create({
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

export default createAmenity;
