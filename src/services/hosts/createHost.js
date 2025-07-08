import prisma from "../../../prisma/prisma.js";
import { z } from "zod";
import { CreateHostSchema } from "../../utils/schema.js";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  try {
    const validatedData = CreateHostSchema.parse({
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });
    const existingHost = await prisma.host.findFirst({
      where: {
        OR: [{ username: username }],
      },
    });
    if (existingHost) {
      const err = new Error("A host with that username already exists.");
      err.status = 409;
      throw err;
    }
    return prisma.host.create({
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
      const error = new Error(err.message ?? "Internal Server Error");
      error.status = err.status ?? 500;
      throw error;
    }
  }
};

export default createHost;
