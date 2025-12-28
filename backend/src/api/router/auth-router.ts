import { Router } from "express";
import { container } from "../../di/config.inversify";
import { TYPES } from "../../di/types";
import { AuthController } from "../controller/AuthController";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  loginSchema,
  refreshTokenSchema,
  signupSchema,
} from "../schema/auth-schema";

const authRouter = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

authRouter.post(
  "/signup",
  validateRequestBody(signupSchema),
  authController.signup.bind(authController)
);

authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.login.bind(authController)
);

authRouter.post(
  "/refresh-token",
  validateRequestBody(refreshTokenSchema),
  authController.refreshToken.bind(authController)
);

export { authRouter };
