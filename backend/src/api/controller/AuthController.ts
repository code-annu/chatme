import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { SignupUsecase } from "../../application/usecase/authentication/SignupUsecase";
import { LoginUsecase } from "../../application/usecase/authentication/LoginUsecase";
import { RefreshTokenUsecase } from "../../application/usecase/authentication/RefreshTokenUsecase";
import { SignupInput, LoginInput } from "../../application/dto/auth-dto";
import { AuthResponse } from "../response/AuthResponse";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.SignupUsecase)
    private readonly signupUsecase: SignupUsecase,
    @inject(TYPES.LoginUsecase)
    private readonly loginUsecase: LoginUsecase,
    @inject(TYPES.RefreshTokenUsecase)
    private readonly refreshTokenUsecase: RefreshTokenUsecase,
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: SignupInput = req.body;
      const result = await this.signupUsecase.execute(input);
      const response = AuthResponse.toSingle(
        result,
        "User registered successfully",
        201,
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: LoginInput = req.body;
      const result = await this.loginUsecase.execute(input);
      const response = AuthResponse.toSingle(result, "Login successful", 200);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { token } = req.body;
      const result = await this.refreshTokenUsecase.execute(token);
      const response = AuthResponse.toSingle(
        result,
        "Token refreshed successfully",
        200,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
