import prisma from "../../../prisma/prisma.js";
import NotFoundError from "../../errors/notFoundError.js";

const deleteUser = async (id) => {
  const deleteUser = await prisma.user.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteUser || deleteUser.count === 0) {
    throw new NotFoundError("User", id);
  }

  return id;
};
export default deleteUser;
