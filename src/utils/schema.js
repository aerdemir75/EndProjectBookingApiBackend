import { z } from "zod";

const uuid = z.string();

export const UserSchema = z.object({
  id: uuid.optional(),
  username: z.string().min(1),
  password: z.string().min(6),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  profilePicture: z.string().url().optional(),
});

export const CreateUserSchema = UserSchema.omit({ id: true });
export const UpdateUserSchema = UserSchema.partial().extend({ id: uuid });

export const HostSchema = z.object({
  id: uuid.optional(),
  username: z.string().min(1),
  password: z.string().min(6),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  profilePicture: z.string().url().optional(),
  aboutMe: z.string().optional(),
});

export const CreateHostSchema = HostSchema.omit({ id: true });
export const UpdateHostSchema = HostSchema.partial().extend({ id: uuid });

export const PropertySchema = z.object({
  id: uuid.optional(),
  hostId: uuid,
  title: z.string(),
  description: z.string(),
  location: z.string(),
  pricePerNight: z.number().positive(),
  bedroomCount: z.number().int().min(0),
  bathRoomCount: z.number().int().min(0),
  maxGuestCount: z.number().int().min(1),
  rating: z.number().int().min(0).max(5).optional(),
});

export const CreatePropertySchema = PropertySchema.omit({ id: true });
export const UpdatePropertySchema = PropertySchema.partial().extend({
  id: uuid,
});

export const AmenitySchema = z.object({
  id: uuid.optional(),
  name: z.string().min(1),
});

export const CreateAmenitySchema = AmenitySchema.omit({ id: true });
export const UpdateAmenitySchema = AmenitySchema.partial().extend({ id: uuid });

export const BookingSchema = z.object({
  id: uuid.optional(),
  userId: uuid,
  propertyId: uuid,
  checkinDate: z.coerce.date(),
  checkoutDate: z.coerce.date(),
  numberOfGuests: z.number().int().min(1),
  totalPrice: z.number().positive(),
  bookingStatus: z.string(),
});

export const CreateBookingSchema = BookingSchema.omit({ id: true });
export const UpdateBookingSchema = BookingSchema.partial().extend({ id: uuid });

export const ReviewSchema = z.object({
  id: uuid.optional(),
  userId: uuid,
  propertyId: uuid,
  rating: z.number().int().min(1).max(5),
  comment: z.string(),
});

export const CreateReviewSchema = ReviewSchema.omit({ id: true });
export const UpdateReviewSchema = ReviewSchema.partial().extend({ id: uuid });
