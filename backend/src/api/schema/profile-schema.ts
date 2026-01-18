import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "firstName must be at least 2 characters" })
    .max(50, { message: "firstName must be at most 50 characters" })
    .optional(),
  lastName: z
    .string()
    .min(2, { message: "lastName must be at least 2 characters" })
    .max(50, { message: "lastName must be at most 50 characters" })
    .optional(),
  bio: z
    .string()
    .max(500, { message: "bio must be at most 500 characters" })
    .optional(),
  avatarUrl: z.url({ message: "avatarUrl must be a valid URL" }).optional(),
  isVerified: z.boolean({ message: "isVerified must be a boolean" }).optional(),
});
