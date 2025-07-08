import prisma from "../../../prisma/prisma.js";
import { CreateUserSchema } from "../../utils/schema.js";
import { z } from "zod";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  try {
    const validatedData = CreateUserSchema.parse({
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }],
      },
    });
    if (existingUser) {
      const err = new Error("A user with that username already exists.");
      err.status = 409;
      throw err;
    }
    console.log("Validated Data:", validatedData);
    return prisma.user.create({
      data: validatedData,
    });
  } catch (err) {
    console.error("Error in createUser:", err);
    if (err instanceof z.ZodError) {
      const message = err.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");
      const error = new Error(message);
      error.status = 400;
      throw error;
    } else {
      const error = new Error(err.message ?? "Internal Server Error");
      error.status = err.status ?? 500;
      throw error;
    }
  }
};

export default createUser;
