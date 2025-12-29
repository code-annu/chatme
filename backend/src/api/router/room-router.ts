import { Router } from "express";
import { container } from "../../di/config.inversify";
import { TYPES } from "../../di/types";
import { RoomController } from "../controller/RoomController";
import { validateAuthorization } from "../middleware/validate-authorization";
import { validateRequestBody } from "../middleware/validate-request-body";
import { createRoomSchema } from "../schema/room-schema";
import { sendMessageSchema } from "../schema/message-schema";
import { MessageController } from "../controller/MessageController";

const roomRouter = Router();
const roomController = container.get<RoomController>(TYPES.RoomController);
const messageController = container.get<MessageController>(
  TYPES.MessageController
);

roomRouter.use(validateAuthorization);

roomRouter.post(
  "/",
  validateRequestBody(createRoomSchema),
  roomController.create.bind(roomController)
);

roomRouter.post(
  "/:id/messages",
  validateRequestBody(sendMessageSchema),
  messageController.sendMessage.bind(messageController)
);

roomRouter.get("/", roomController.getMyRooms.bind(roomController));
roomRouter.get("/:id", roomController.getById.bind(roomController));
roomRouter.get(
  "/:id/messages",
  messageController.getRoomMessages.bind(messageController)
);

export { roomRouter };
