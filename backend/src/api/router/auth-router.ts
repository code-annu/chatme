import { Router } from "express";
import { authController } from "../controller/AuthController";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  signupSchema,
  loginSchema,
  refreshTokenSchema,
} from "../schema/auth-schema";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateRequestBody(signupSchema),
  authController.signup.bind(authController),
);

authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.login.bind(authController),
);

authRouter.post(
  "/refresh-token",
  validateRequestBody(refreshTokenSchema),
  authController.refreshToken.bind(authController),
);

export { authRouter };
