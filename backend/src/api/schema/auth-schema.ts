import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters long"),
  password: z.string().trim().min(6, "Password must be at least 6 characters long"),
  fullname: z.string().trim().min(1, "Full name is required"),
  profilePictureUrl: z.string().optional(),
  bio: z.string().optional(),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  token: z.string().min(1, "Refresh token is required"),
});
