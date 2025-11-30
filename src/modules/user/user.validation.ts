import { z } from 'zod';

export const userValidation = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters long')
    .optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
});
