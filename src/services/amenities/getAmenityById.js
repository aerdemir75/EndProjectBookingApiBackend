import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../../prisma/prisma.js";

const getAmenityById = async (id) => {
  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  if (!amenity) {
    throw new NotFoundError("Amenity", id);
  }

  return amenity;
};

export default getAmenityById;
