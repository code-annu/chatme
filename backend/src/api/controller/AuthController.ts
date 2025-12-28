import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { SignupUsecase } from "../../application/usecases/auth/SignupUsecase";
import { LoginUsecase } from "../../application/usecases/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../../application/usecases/auth/RefreshTokenUsecase";
import { AuthResponseMapper } from "../response/auth-response";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.SignupUsecase) private signupUsecase: SignupUsecase,
    @inject(TYPES.LoginUsecase) private loginUsecase: LoginUsecase,
    @inject(TYPES.RefreshTokenUsecase)
    private refreshTokenUsecase: RefreshTokenUsecase
  ) {}

  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const output = await this.signupUsecase.execute(req.body);
      const response = AuthResponseMapper.mapToAuthResponse(
        output,
        "User registered successfully",
        201
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const output = await this.loginUsecase.execute(req.body);
      const response = AuthResponseMapper.mapToAuthResponse(
        output,
        "Login successful",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      const output = await this.refreshTokenUsecase.execute(token);
      const response = AuthResponseMapper.mapToAuthResponse(
        output,
        "Token refreshed successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
