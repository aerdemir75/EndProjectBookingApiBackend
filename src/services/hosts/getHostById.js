import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../../prisma/prisma.js";

const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  if (!host) {
    throw new NotFoundError("Host", id);
  }

  return host;
};

export default getHostById;
