import { Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { AuthRequest } from "../middleware/validate-authorization";
import { MessageResponse } from "../response/MessageResponse";
import { SendMessageToUserUsecase } from "../../application/usecase/messages/SendMessageToUserUsecase";
import { SendMessageToRoomUsecase } from "../../application/usecase/messages/SendMessageToRoomUsecase";
import { EditMessageUsecase } from "../../application/usecase/messages/EditMessageUsecase";
import { DeleteMessageUsecase } from "../../application/usecase/messages/DeleteMessageUsecase";
import { GetMessageUsecase } from "../../application/usecase/messages/GetMessageUsecase";
import { UpdateMessageStatusUsecase } from "../../application/usecase/messages/UpdateMessageStatusUsecase";
import { GetRoomMessagesUsecase } from "../../application/usecase/messages/GetRoomMessagesUsecase";
import { MessageStatus } from "../../domain/entity/message-entity";

@injectable()
export class MessageController {
  constructor(
    @inject(TYPES.SendMessageToUserUsecase)
    private readonly sendMessageToUserUsecase: SendMessageToUserUsecase,
    @inject(TYPES.SendMessageToRoomUsecase)
    private readonly sendMessageToRoomUsecase: SendMessageToRoomUsecase,
    @inject(TYPES.EditMessageUsecase)
    private readonly editMessageUsecase: EditMessageUsecase,
    @inject(TYPES.DeleteMessageUsecase)
    private readonly deleteMessageUsecase: DeleteMessageUsecase,
    @inject(TYPES.GetMessageUsecase)
    private readonly getMessageUsecase: GetMessageUsecase,
    @inject(TYPES.UpdateMessageStatusUsecase)
    private readonly updateMessageStatusUsecase: UpdateMessageStatusUsecase,
    @inject(TYPES.GetRoomMessagesUsecase)
    private readonly getRoomMessagesUsecase: GetRoomMessagesUsecase,
  ) {}

  async sendMessageToUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const senderId = req.auth!.userId;
      const { receiverId, text } = req.body;
      const result = await this.sendMessageToUserUsecase.execute({
        senderId,
        receiverId,
        text,
      });
      const response = MessageResponse.toSingle(
        result,
        "Message sent successfully",
        201,
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async sendMessageToRoom(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const senderId = req.auth!.userId;
      const { text } = req.body;
      const roomId = req.params.roomId as string;
      
      const result = await this.sendMessageToRoomUsecase.execute({
        senderId,
        roomId,
        text,
      });
      const response = MessageResponse.toSingle(
        result,
        "Message sent successfully",
        201,
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async editMessage(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const messageId = req.params.messageId as string;
      const { text } = req.body;
      const result = await this.editMessageUsecase.execute({
        userId,
        messageId,
        text,
      });
      const response = MessageResponse.toSingle(
        result,
        "Message edited successfully",
        200,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteMessage(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const messageId = req.params.messageId as string;
      await this.deleteMessageUsecase.execute(userId, messageId);
      res.status(200).json({
        status: "success",
        message: "Message deleted successfully",
        code: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMessage(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const messageId = req.params.messageId as string;
      const result = await this.getMessageUsecase.execute(userId, messageId);
      const response = MessageResponse.toSingle(
        result,
        "Message retrieved successfully",
        200,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateMessageStatus(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const messageId = req.params.messageId as string;
      const { status } = req.body;
      await this.updateMessageStatusUsecase.execute({
        userId,
        messageId,
        status: status as MessageStatus,
      });
      res.status(200).json({
        status: "success",
        message: "Message status updated successfully",
        code: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRoomMessages(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const roomId = req.params.roomId as string;
      const result = await this.getRoomMessagesUsecase.execute(userId, roomId);
      const response = MessageResponse.toList(
        result,
        "Room messages retrieved successfully",
        200,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
