import prisma from "../../../prisma/prisma.js";

const getAmenities = async (name) => {
  const whereClause = {};
  if (name) {
    whereClause.name = name;
  }

  const amenities = await prisma.amenity.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
  });

  if (!amenities || amenities.length === 0) {
    const error = new Error("No amenities found matching the given criteria.");
    error.status = 404;
    error.name = "NotFoundError";
    throw error;
  }

  return amenities;
};

export default getAmenities;
