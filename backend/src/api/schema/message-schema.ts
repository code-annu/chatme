import { z } from "zod";
import { MessageStatus } from "../../domain/entities/message-entity";

export const sendMessageSchema = z.object({
  text: z.string().min(1, "Message text cannot be empty"),
});

export const updateMessageSchema = z.object({
  text: z.string().min(1, "Message text cannot be empty"),
});

export const updateMessageStatusSchema = z.object({
  status: z.enum(Object.values(MessageStatus) as [string, ...string[]]),
});
