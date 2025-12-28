import { Container } from "inversify";
import { TYPES } from "./types";
import { SignupUsecase } from "../application/usecases/auth/SignupUsecase";
import { LoginUsecase } from "../application/usecases/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../application/usecases/auth/RefreshTokenUsecase";
import { UpdateProfileUsecase } from "../application/usecases/profile/UpdateProfileUsecase";
import { GetProfileUsecase } from "../application/usecases/profile/GetProfileUsecase";
import { DeleteProfileUsecase } from "../application/usecases/profile/DeleteProfileUsecase";
import { SearchProfilesUsecase } from "../application/usecases/profile/SearchProfilesUsecase";
import { IUserRepository } from "../domain/repository/IUserRepository";
import { ISessionRepository } from "../domain/repository/ISessionRepository";
import { UserRepository } from "../infrastructure/repository/UserRepository";
import { SessionRepository } from "../infrastructure/repository/SessionRepository";
import { AuthController } from "../api/controller/AuthController";
import { ProfileController } from "../api/controller/ProfileController";

const container = new Container();

container.bind<SignupUsecase>(TYPES.SignupUsecase).to(SignupUsecase);
container.bind<LoginUsecase>(TYPES.LoginUsecase).to(LoginUsecase);
container
  .bind<RefreshTokenUsecase>(TYPES.RefreshTokenUsecase)
  .to(RefreshTokenUsecase);

container
  .bind<UpdateProfileUsecase>(TYPES.UpdateProfileUsecase)
  .to(UpdateProfileUsecase);
container
  .bind<GetProfileUsecase>(TYPES.GetProfileUsecase)
  .to(GetProfileUsecase);
container
  .bind<DeleteProfileUsecase>(TYPES.DeleteProfileUsecase)
  .to(DeleteProfileUsecase);
container
  .bind<SearchProfilesUsecase>(TYPES.SearchProfilesUsecase)
  .to(SearchProfilesUsecase);

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container
  .bind<ISessionRepository>(TYPES.ISessionRepository)
  .to(SessionRepository);

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
  .bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController);

export { container };
