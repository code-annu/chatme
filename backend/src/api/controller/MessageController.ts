import { NextFunction, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { SendMessageUsecase } from "../../application/usecases/messages/SendMessageUsecase";
import { GetMessageUsecase } from "../../application/usecases/messages/GetMessageUsecase";
import { GetRoomMessagesUsecase } from "../../application/usecases/messages/GetRoomMessagesUsecase";
import { UpdateMessageUsecase } from "../../application/usecases/messages/UpdateMessageUsecase";
import { UpdateMessageStatusUsecase } from "../../application/usecases/messages/UpdateMessageStatusUsecase";
import { DeleteMessageUsecase } from "../../application/usecases/messages/DeleteMessageUsecase";
import { AuthRequest } from "../middleware/validate-authorization";
import { MessageResponseMapper } from "../response/message-response";
import {
  SendMessageInput,
  MessageUpdateInput,
  MessageStatusUpdateInput,
} from "../../application/dto/message-dto";

@injectable()
export class MessageController {
  constructor(
    @inject(TYPES.SendMessageUsecase)
    private sendMessageUsecase: SendMessageUsecase,
    @inject(TYPES.GetMessageUsecase)
    private getMessageUsecase: GetMessageUsecase,
    @inject(TYPES.GetRoomMessagesUsecase)
    private getRoomMessagesUsecase: GetRoomMessagesUsecase,
    @inject(TYPES.UpdateMessageUsecase)
    private updateMessageUsecase: UpdateMessageUsecase,
    @inject(TYPES.UpdateMessageStatusUsecase)
    private updateMessageStatusUsecase: UpdateMessageStatusUsecase,
    @inject(TYPES.DeleteMessageUsecase)
    private deleteMessageUsecase: DeleteMessageUsecase
  ) {}

  public async sendMessage(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth?.userId;
      const { text } = req.body;

      const { id: roomId } = req.params;

      const output = await this.sendMessageUsecase.execute({
        text,
        roomId,
        senderId: userId!,
      });
      const response = MessageResponseMapper.toMessageResponse(
        output,
        "Message sent successfully",
        201
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { id: roomId } = req.params;

      const output = await this.getMessageUsecase.execute(userId!, roomId);
      const response = MessageResponseMapper.toMessageResponse(
        output,
        "Message retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getRoomMessages(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth?.userId;
      const { id: roomId } = req.params;

      const output = await this.getRoomMessagesUsecase.execute(userId!, roomId);
      const response = MessageResponseMapper.toMessageListResponse(
        output,
        "Room messages retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { id: roomId } = req.params;
      const input: MessageUpdateInput = req.body;

      const output = await this.updateMessageUsecase.execute(
        userId!,
        roomId,
        input
      );
      const response = MessageResponseMapper.toMessageResponse(
        output,
        "Message updated successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async updateStatus(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth?.userId;
      const { id: roomId } = req.params;
      const input: MessageStatusUpdateInput = req.body;

      const output = await this.updateMessageStatusUsecase.execute(
        userId!,
        roomId,
        input
      );
      const response = MessageResponseMapper.toMessageResponse(
        output,
        "Message status updated successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { id: roomId } = req.params;

      const output = await this.deleteMessageUsecase.execute(userId!, roomId);
      const response = MessageResponseMapper.toMessageResponse(
        output,
        "Message deleted successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
