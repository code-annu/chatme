import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .min(2, { message: "firstName must be at least 2 characters" })
    .max(50, { message: "firstName must be at most 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "lastName must be at least 2 characters" })
    .max(50, { message: "lastName must be at most 50 characters" })
    .optional(),
  email: z.email({ error: "Please provide a valid email address" }),
  password: z
    .string({ error: "password is required" })
    .min(8, { message: "password must be at least 8 characters" })
    .max(128, { message: "password must be at most 128 characters" }),
  avatarUrl: z.url({ message: "avatarUrl must be a valid URL" }).optional(),
  bio: z
    .string()
    .max(500, { message: "bio must be at most 500 characters" })
    .optional(),
});

export const loginSchema = z.object({
  email: z.email({ error: "Please provide a valid email address" }),
  password: z
    .string({ error: "password is required" })
    .min(1, { message: "password is required" }),
});

export const refreshTokenSchema = z.object({
  token: z
    .string({ error: "token is required" })
    .min(1, { message: "token is required" }),
});
