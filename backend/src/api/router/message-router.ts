import { Router } from "express";
import { container } from "../../di/config.inversify";
import { TYPES } from "../../di/types";
import { MessageController } from "../controller/MessageController";
import { validateAuthorization } from "../middleware/validate-authorization";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  updateMessageSchema,
  updateMessageStatusSchema,
} from "../schema/message-schema";

const messageRouter = Router();
const controller = container.get<MessageController>(TYPES.MessageController);

messageRouter.use(validateAuthorization);

messageRouter.get("/:id", controller.getById.bind(controller));

messageRouter.patch(
  "/:id",
  validateRequestBody(updateMessageSchema),
  controller.update.bind(controller)
);

messageRouter.patch(
  "/:id/status",
  validateRequestBody(updateMessageStatusSchema),
  controller.updateStatus.bind(controller)
);

messageRouter.delete("/:id", controller.delete.bind(controller));

export { messageRouter };
