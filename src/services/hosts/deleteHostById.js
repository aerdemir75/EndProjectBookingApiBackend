import prisma from "../../../prisma/prisma.js";
import NotFoundError from "../../errors/notFoundError.js";

const deleteHost = async (id) => {
  const deleteHost = await prisma.host.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteHost || deleteHost.count === 0) {
    throw new NotFoundError("Host", id);
  }

  return id;
};
export default deleteHost;
