import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { UpdateProfileUsecase } from "../../application/usecases/profile/UpdateProfileUsecase";
import { GetProfileUsecase } from "../../application/usecases/profile/GetProfileUsecase";
import { DeleteProfileUsecase } from "../../application/usecases/profile/DeleteProfileUsecase";
import { SearchProfilesUsecase } from "../../application/usecases/profile/SearchProfilesUsecase";
import { AuthRequest } from "../middleware/validate-authorization";
import { ProfileResponseMapper } from "../response/profile-response";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class ProfileController {
  constructor(
    @inject(TYPES.UpdateProfileUsecase)
    private updateProfileUsecase: UpdateProfileUsecase,
    @inject(TYPES.GetProfileUsecase)
    private getProfileUsecase: GetProfileUsecase,
    @inject(TYPES.DeleteProfileUsecase)
    private deleteProfileUsecase: DeleteProfileUsecase,
    @inject(TYPES.SearchProfilesUsecase)
    private searchProfilesUsecase: SearchProfilesUsecase
  ) {}

  public async updateMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;

      const output = await this.updateProfileUsecase.execute(userId!, req.body);
      const response = ProfileResponseMapper.mapToProfileDetailsResponse(
        output,
        "Profile updated successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;

      const output = await this.getProfileUsecase.execute(userId!);
      const response = ProfileResponseMapper.mapToProfileDetailsResponse(
        output,
        "Profile retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async deleteMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;

      const output = await this.deleteProfileUsecase.execute(userId!);
      const response = ProfileResponseMapper.mapToProfileDetailsResponse(
        output,
        "Profile deleted successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const output = await this.getProfileUsecase.execute(id);
      const response = ProfileResponseMapper.mapToProfileDetailsResponse(
        output,
        "Profile retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.query;

      if (typeof username !== "string") {
        // If no query or invalid type, validation can handle or we just return empty
        const response = ProfileResponseMapper.mapToProfileListResponse(
          [],
          "Search results retrieved successfully",
          200
        );
        res.status(200).json(response);
        return;
      }

      const output = await this.searchProfilesUsecase.execute(username);
      const response = ProfileResponseMapper.mapToProfileListResponse(
        output,
        "Search results retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
