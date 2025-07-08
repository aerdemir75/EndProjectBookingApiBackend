import prisma from "../../../prisma/prisma.js";

const getUsers = async (username, email) => {
  const whereClause = {};

  if (username) {
    whereClause.username = username;
  }

  if (email) {
    whereClause.email = email;
  }

  const users = await prisma.user.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,
      name: true,
      profilePicture: true,
    },
  });

  if (!users || users.length === 0) {
    const error = new Error("No users found matching the given criteria.");
    error.status = 404;
    error.name = "NotFoundError";
    throw error;
  }

  return users;
};

export default getUsers;
