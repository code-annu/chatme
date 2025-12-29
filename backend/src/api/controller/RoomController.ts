import { NextFunction, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { CreateRoomUsecase } from "../../application/usecases/room/CreateRoomUsecase";
import { GetRoomUsecase } from "../../application/usecases/room/GetRoomUsecase";
import { GetUserRoomsUsecase } from "../../application/usecases/room/GetUserRoomsUsecase";
import { AuthRequest } from "../middleware/validate-authorization";
import { RoomResponseMapper } from "../response/room-response";
import { RoomCreateInput } from "../../application/dto/room-dto";

@injectable()
export class RoomController {
  constructor(
    @inject(TYPES.CreateRoomUsecase)
    private createRoomUsecase: CreateRoomUsecase,
    @inject(TYPES.GetRoomUsecase)
    private getRoomUsecase: GetRoomUsecase,
    @inject(TYPES.GetUserRoomsUsecase)
    private getUserRoomsUsecase: GetUserRoomsUsecase
  ) {}

  public async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const input: RoomCreateInput = req.body;

      const output = await this.createRoomUsecase.execute(userId!, input);
      const response = RoomResponseMapper.toRoomDetailsResponse(
        output,
        "Room created successfully",
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
      const { id } = req.params;

      const output = await this.getRoomUsecase.execute(userId!, id);
      const response = RoomResponseMapper.toRoomDetailsResponse(
        output,
        "Room retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getMyRooms(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;

      const output = await this.getUserRoomsUsecase.execute(userId!);
      const response = RoomResponseMapper.toRoomListResponse(
        output,
        "User rooms retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
