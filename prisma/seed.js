import { PrismaClient } from "@prisma/client";
import userData from "../src/data/users.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import amenityData from "../src/data/amenities.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = userData;
  const { bookings } = bookingData;
  const { properties } = propertyData;
  const { reviews } = reviewData;
  const { hosts } = hostData;
  const { amenities } = amenityData;

  // Amenities
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  // Hosts
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  // Properties + koppel 2 willekeurige amenities
  for (const property of properties) {
    const shuffledAmenities = [...amenities].sort(() => 0.5 - Math.random());
    const selectedAmenities = shuffledAmenities.slice(0, 2); // 2 willekeurige amenities

    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        ...property,
        amenities: {
          connect: selectedAmenities.map((a) => ({ id: a.id })),
        },
      },
    });
  }

  // Users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }

  // Bookings
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }
}

// Run script
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
