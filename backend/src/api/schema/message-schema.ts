import { z } from "zod";

export const sendMessageToUserSchema = z.object({
  receiverId: z
    .string({ error: "receiverId is required" })
    .min(1, { message: "receiverId is required" }),
  text: z
    .string({ error: "text is required" })
    .min(1, { message: "text is required" })
    .max(5000, { message: "text must be at most 5000 characters" }),
});

export const sendMessageToRoomSchema = z.object({
  text: z
    .string({ error: "text is required" })
    .min(1, { message: "text is required" })
    .max(5000, { message: "text must be at most 5000 characters" }),
});

export const editMessageSchema = z.object({
  text: z
    .string({ error: "text is required" })
    .min(1, { message: "text is required" })
    .max(5000, { message: "text must be at most 5000 characters" }),
});

export const updateMessageStatusSchema = z.object({
  status: z.enum(["pending", "sent", "delivered", "read", "deleted"], {
    error: "status must be one of: pending, sent, delivered, read, deleted",
  }),
});
