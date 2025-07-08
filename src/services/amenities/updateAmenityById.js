import prisma from "../../../prisma/prisma.js";
import NotFoundError from "../../errors/notFoundError.js";

const updateAmenityById = async (id, name) => {
  const updatedAmenity = await prisma.amenity.updateMany({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  if (!updatedAmenity || updatedAmenity.count === 0) {
    throw new NotFoundError("Amenity", id);
  }

  return {
    message: `Amenity with id ${id} was updated!`,
  };
};

export default updateAmenityById;
