import { Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { AuthRequest } from "../middleware/validate-authorization";
import { RoomResponse } from "../response/RoomResponse";
import { GetUserRoomsUsecase } from "../../application/usecase/room/GetUserRoomsUsecase";
import { GetRoomUsecase } from "../../application/usecase/room/GetRoomUsecase";

@injectable()
export class RoomController {
  constructor(
    @inject(TYPES.GetUserRoomsUsecase)
    private readonly getUserRoomsUsecase: GetUserRoomsUsecase,
    @inject(TYPES.GetRoomUsecase)
    private readonly getRoomUsecase: GetRoomUsecase,
  ) {}

  async getUserRooms(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const result = await this.getUserRoomsUsecase.execute(userId);
      const response = RoomResponse.toList(
        result,
        "User rooms retrieved successfully",
        200,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getRoom(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const roomId = req.params.roomId as string;
      const result = await this.getRoomUsecase.execute(userId, roomId);
      const response = RoomResponse.toSingle(
        result,
        "Room retrieved successfully",
        200,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
