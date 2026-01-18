export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),

  // Auth Usecases
  SignupUsecase: Symbol.for("SignupUsecase"),
  LoginUsecase: Symbol.for("LoginUsecase"),
  RefreshTokenUsecase: Symbol.for("RefreshTokenUsecase"),

  // Profile Usecases
  GetProfileUsecase: Symbol.for("GetProfileUsecase"),
  UpdateProfileUsecase: Symbol.for("UpdateProfileUsecase"),
  DeleteProfileUsecase: Symbol.for("DeleteProfileUsecase"),

  // Controllers
  AuthController: Symbol.for("AuthController"),
  ProfileController: Symbol.for("ProfileController"),
};
