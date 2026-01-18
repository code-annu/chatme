import { Router } from "express";
import { container } from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import { ProfileController } from "../controller/ProfileController";
import { validateRequestBody } from "../middleware/validate-request-body";
import { validateAuthorization } from "../middleware/validate-authorization";
import { updateProfileSchema } from "../schema/profile-schema";

const profileRouter = Router();
const profileController = container.get<ProfileController>(
  TYPES.ProfileController,
);

// Protected routes - require authorization
profileRouter.get(
  "/",
  validateAuthorization,
  profileController.getProfile.bind(profileController),
);

profileRouter.patch(
  "/",
  validateAuthorization,
  validateRequestBody(updateProfileSchema),
  profileController.updateProfile.bind(profileController),
);

profileRouter.delete(
  "/",
  validateAuthorization,
  profileController.deleteProfile.bind(profileController),
);

// Public route - get profile by id
profileRouter.get(
  "/:id",
  profileController.getProfileById.bind(profileController),
);

export { profileRouter };
