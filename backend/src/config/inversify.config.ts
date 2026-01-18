import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { IUserRepository } from "../domain/repository/IUserRepository";
import { ISessionRepository } from "../domain/repository/ISessionRepository";
import { UserRepository } from "../infrastructure/repository/UserRepository";
import { SessionRepository } from "../infrastructure/repository/SessionRepository";

// Usecases
import { SignupUsecase } from "../application/usecase/authentication/SignupUsecase";
import { LoginUsecase } from "../application/usecase/authentication/LoginUsecase";
import { RefreshTokenUsecase } from "../application/usecase/authentication/RefreshTokenUsecase";
import { GetProfileUsecase } from "../application/usecase/profile/GetProfileUsecase";
import { UpdateProfileUsecase } from "../application/usecase/profile/UpdateProfileUsecase";
import { DeleteProfileUsecase } from "../application/usecase/profile/DeleteProfileUsecase";

// Controllers
import { AuthController } from "../api/controller/AuthController";
import { ProfileController } from "../api/controller/ProfileController";

const container = new Container();

// Bind Repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container
  .bind<ISessionRepository>(TYPES.ISessionRepository)
  .to(SessionRepository);

// Bind Usecases
container.bind<SignupUsecase>(TYPES.SignupUsecase).to(SignupUsecase);
container.bind<LoginUsecase>(TYPES.LoginUsecase).to(LoginUsecase);
container
  .bind<RefreshTokenUsecase>(TYPES.RefreshTokenUsecase)
  .to(RefreshTokenUsecase);
container
  .bind<GetProfileUsecase>(TYPES.GetProfileUsecase)
  .to(GetProfileUsecase);
container
  .bind<UpdateProfileUsecase>(TYPES.UpdateProfileUsecase)
  .to(UpdateProfileUsecase);
container
  .bind<DeleteProfileUsecase>(TYPES.DeleteProfileUsecase)
  .to(DeleteProfileUsecase);

// Bind Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
  .bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController);

export { container };
