import prisma from "../../../prisma/prisma.js";
import NotFoundError from "../../errors/notFoundError.js";

const deleteProperty = async (id) => {
  const deleteProperty = await prisma.property.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteProperty || deleteProperty.count === 0) {
    throw new NotFoundError("Property", id);
  }

  return id;
};
export default deleteProperty;
