import { Router } from "express";
import { container } from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import { MessageController } from "../controller/MessageController";
import { validateRequestBody } from "../middleware/validate-request-body";
import { validateAuthorization } from "../middleware/validate-authorization";
import {
  sendMessageToUserSchema,
  editMessageSchema,
  updateMessageStatusSchema,
} from "../schema/message-schema";

const messageRouter = Router();
const messageController = container.get<MessageController>(
  TYPES.MessageController,
);

// Send message to user
messageRouter.post(
  "/",
  validateAuthorization,
  validateRequestBody(sendMessageToUserSchema),
  messageController.sendMessageToUser.bind(messageController),
);

// Edit message
messageRouter.patch(
  "/:messageId",
  validateAuthorization,
  validateRequestBody(editMessageSchema),
  messageController.editMessage.bind(messageController),
);

// Delete message
messageRouter.delete(
  "/:messageId",
  validateAuthorization,
  messageController.deleteMessage.bind(messageController),
);

// Get message
messageRouter.get(
  "/:messageId",
  validateAuthorization,
  messageController.getMessage.bind(messageController),
);

// Update message status
messageRouter.patch(
  "/:messageId/status",
  validateAuthorization,
  validateRequestBody(updateMessageStatusSchema),
  messageController.updateMessageStatus.bind(messageController),
);

export { messageRouter };
