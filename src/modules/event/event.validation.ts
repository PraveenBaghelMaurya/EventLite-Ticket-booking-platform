import { z } from "zod";

export const eventValidation = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    description: z.string().min(10, "Description must be at least 10 characters long").optional(),
    shortDescription: z.string().min(10, "Short description must be at least 10 characters long").optional(),
    venue: z.string().min(3, "Venue must be at least 3 characters long").optional(),
    street: z.string().min(3, "Street must be at least 3 characters long").optional(),
    city: z.string().min(3, "City must be at least 3 characters long").optional(),
    state: z.string().min(3, "State must be at least 3 characters long").optional(),
    country: z.string().min(3, "Country must be at least 3 characters long").optional(),
    postalCode: z.string().min(3, "Postal code must be at least 3 characters long").optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    doorTime: z.coerce.date().optional(),
    image: z.string().min(3, "Image must be at least 3 characters long").optional(),
    images: z.array(z.string()).min(1, "Images must be at least 1 character long").optional(),
    price: z.number().min(0, "Price must be at least 0").optional(),
    capacity: z.number().min(5, "Capacity must be at least 5").optional(),
    availableTickets: z.number().min(5, "Available tickets must be at least 5").optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"]).optional(),
    isFeatured: z.boolean().default(false).optional(),
    isPublic: z.boolean().default(true).optional(),
    organizerId: z.number().min(1, "Organizer ID must be at least 1").optional(),
    categoryId: z.number().min(1, "Category ID must be at least 1").optional(),
});

export const categoryValidation = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").optional(),
    description: z.string().min(10, "Description must be at least 10 characters long").optional(),
    slug: z.string().min(3, "Slug must be at least 3 characters long").optional(),
    image: z.string().min(3, "Image must be at least 3 characters long").optional(),
});

export const eventWithCategoryValidation = z.object({
  event: eventValidation,
  category: categoryValidation.optional(), 
});