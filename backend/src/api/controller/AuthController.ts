import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { container } from "../../config/inversify.config";
import { SignupUsecase } from "../../application/usecase/authentication/SignupUsecase";
import { LoginUsecase } from "../../application/usecase/authentication/LoginUsecase";
import { RefreshTokenUsecase } from "../../application/usecase/authentication/RefreshTokenUsecase";
import { SignupInput, LoginInput } from "../../application/dto/auth-dto";
import { AuthResponse } from "../response/AuthResponse";

@injectable()
export class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const signupUsecase = container.get(SignupUsecase);
      const input: SignupInput = req.body;
      const result = await signupUsecase.execute(input);
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
      const loginUsecase = container.get(LoginUsecase);
      const input: LoginInput = req.body;
      const result = await loginUsecase.execute(input);
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
      const refreshTokenUsecase = container.get(RefreshTokenUsecase);
      const { token } = req.body;
      const result = await refreshTokenUsecase.execute(token);
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

export const authController = new AuthController();
