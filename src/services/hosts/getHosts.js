import prisma from "../../../prisma/prisma.js";

const getHosts = async (name) => {
  const whereClause = {};

  if (name) {
    whereClause.name = name;
  }

  const hosts = await prisma.host.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
    },
  });

  if (!hosts || hosts.length === 0) {
    const error = new Error("No hosts found matching the given criteria.");
    error.status = 404;
    error.name = "NotFoundError";
    throw error;
  }

  return hosts;
};

export default getHosts;
