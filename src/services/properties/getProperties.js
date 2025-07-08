import prisma from "../../../prisma/prisma.js";

const getProperties = async (location, pricePerNight, amenities) => {
  const filters = {};

  if (location) {
    filters.location = {
      contains: location,
      // Prisma 6+ ondersteunt geen 'mode', dus laat dit weg als dat problemen geeft
    };
  }

  if (pricePerNight) {
    filters.pricePerNight = parseFloat(pricePerNight);
  }

  const amenityFilter = amenities
    ? {
        some: {
          name: {
            in: amenities.split(",").map((a) => a.trim()),
          },
        },
      }
    : undefined;

  const whereClause = {
    ...filters,
    ...(amenityFilter ? { amenities: amenityFilter } : {}),
  };

  const properties = await prisma.property.findMany({
    where: whereClause,
    include: {
      amenities: true,
    },
  });

  if (!properties || properties.length === 0) {
    const error = new Error("No properties found matching the given criteria.");
    error.status = 404;
    error.name = "NotFoundError";
    throw error;
  }

  return properties;
};

export default getProperties;
