import { Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { GetProfileUsecase } from "../../application/usecase/profile/GetProfileUsecase";
import { UpdateProfileUsecase } from "../../application/usecase/profile/UpdateProfileUsecase";
import { DeleteProfileUsecase } from "../../application/usecase/profile/DeleteProfileUsecase";
import { ProfileUpdateInput } from "../../application/dto/profile-dto";
import { ProfileResponse } from "../response/ProfileResponse";
import { AuthRequest } from "../middleware/validate-authorization";

@injectable()
export class ProfileController {
  constructor(
    @inject(TYPES.GetProfileUsecase)
    private readonly getProfileUsecase: GetProfileUsecase,
    @inject(TYPES.UpdateProfileUsecase)
    private readonly updateProfileUsecase: UpdateProfileUsecase,
    @inject(TYPES.DeleteProfileUsecase)
    private readonly deleteProfileUsecase: DeleteProfileUsecase,
  ) {}

  async getProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const result = await this.getProfileUsecase.execute(userId);
      const response = ProfileResponse.toSingle(
        result,
        "Profile retrieved successfully",
        200,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProfileById(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.params.id as string;
      const result = await this.getProfileUsecase.execute(userId);
      const response = ProfileResponse.toSingle(
        result,
        "Profile retrieved successfully",
        200,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const input: ProfileUpdateInput = {
        userId,
        ...req.body,
      };
      const result = await this.updateProfileUsecase.execute(input);
      const response = ProfileResponse.toSingle(
        result,
        "Profile updated successfully",
        200,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      await this.deleteProfileUsecase.execute(userId);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Profile deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
