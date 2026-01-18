import { Router } from "express";
import { container } from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import { RoomController } from "../controller/RoomController";
import { MessageController } from "../controller/MessageController";
import { validateRequestBody } from "../middleware/validate-request-body";
import { validateAuthorization } from "../middleware/validate-authorization";
import { sendMessageToRoomSchema } from "../schema/message-schema";

const roomRouter = Router();
const roomController = container.get<RoomController>(TYPES.RoomController);
const messageController = container.get<MessageController>(
  TYPES.MessageController,
);

// Get user rooms
roomRouter.get(
  "/",
  validateAuthorization,
  roomController.getUserRooms.bind(roomController),
);

// Get room by id
roomRouter.get(
  "/:roomId",
  validateAuthorization,
  roomController.getRoom.bind(roomController),
);

// Send message to room
roomRouter.post(
  "/:roomId/messages",
  validateAuthorization,
  validateRequestBody(sendMessageToRoomSchema),
  messageController.sendMessageToRoom.bind(messageController),
);

// Get room messages
roomRouter.get(
  "/:roomId/messages",
  validateAuthorization,
  messageController.getRoomMessages.bind(messageController),
);

export { roomRouter };
