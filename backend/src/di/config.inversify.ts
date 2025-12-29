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
import { CreateRoomUsecase } from "../application/usecases/room/CreateRoomUsecase";
import { GetRoomUsecase } from "../application/usecases/room/GetRoomUsecase";
import { GetUserRoomsUsecase } from "../application/usecases/room/GetUserRoomsUsecase";
import { RoomController } from "../api/controller/RoomController";
import { IRoomRepository } from "../domain/repository/IRoomRepository";
import { RoomRepository } from "../infrastructure/repository/RoomRepository";
import { IMessageRepository } from "../domain/repository/IMessageRepository";
import { MessageRepository } from "../infrastructure/repository/MessageRepository";
import { SendMessageUsecase } from "../application/usecases/messages/SendMessageUsecase";
import { GetMessageUsecase } from "../application/usecases/messages/GetMessageUsecase";
import { GetRoomMessagesUsecase } from "../application/usecases/messages/GetRoomMessagesUsecase";
import { UpdateMessageUsecase } from "../application/usecases/messages/UpdateMessageUsecase";
import { UpdateMessageStatusUsecase } from "../application/usecases/messages/UpdateMessageStatusUsecase";
import { DeleteMessageUsecase } from "../application/usecases/messages/DeleteMessageUsecase";
import { MessageController } from "../api/controller/MessageController";

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

container.bind<IRoomRepository>(TYPES.IRoomRepository).to(RoomRepository);
container
  .bind<CreateRoomUsecase>(TYPES.CreateRoomUsecase)
  .to(CreateRoomUsecase);
container.bind<GetRoomUsecase>(TYPES.GetRoomUsecase).to(GetRoomUsecase);
container
  .bind<GetUserRoomsUsecase>(TYPES.GetUserRoomsUsecase)
  .to(GetUserRoomsUsecase);

container.bind<RoomController>(TYPES.RoomController).to(RoomController);

container
  .bind<IMessageRepository>(TYPES.IMessageRepository)
  .to(MessageRepository);
container
  .bind<SendMessageUsecase>(TYPES.SendMessageUsecase)
  .to(SendMessageUsecase);
container
  .bind<GetMessageUsecase>(TYPES.GetMessageUsecase)
  .to(GetMessageUsecase);
container
  .bind<GetRoomMessagesUsecase>(TYPES.GetRoomMessagesUsecase)
  .to(GetRoomMessagesUsecase);
container
  .bind<UpdateMessageUsecase>(TYPES.UpdateMessageUsecase)
  .to(UpdateMessageUsecase);
container
  .bind<UpdateMessageStatusUsecase>(TYPES.UpdateMessageStatusUsecase)
  .to(UpdateMessageStatusUsecase);
container
  .bind<DeleteMessageUsecase>(TYPES.DeleteMessageUsecase)
  .to(DeleteMessageUsecase);
container
  .bind<MessageController>(TYPES.MessageController)
  .to(MessageController);

export { container };
