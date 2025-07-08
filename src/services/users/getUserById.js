import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../../prisma/prisma.js";

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new NotFoundError("User", id);
  }

  return user;
};

export default getUserById;
