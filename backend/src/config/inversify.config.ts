import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { IUserRepository } from "../domain/repository/IUserRepository";
import { ISessionRepository } from "../domain/repository/ISessionRepository";
import { IRoomRepository } from "../domain/repository/IRoomRepository";
import { IMessageRepository } from "../domain/repository/IMessageRepository";
import { UserRepository } from "../infrastructure/repository/UserRepository";
import { SessionRepository } from "../infrastructure/repository/SessionRepository";
import { RoomRepository } from "../infrastructure/repository/RoomRepository";
import { MessageRepository } from "../infrastructure/repository/MessageRepository";

// Usecases
import { SignupUsecase } from "../application/usecase/authentication/SignupUsecase";
import { LoginUsecase } from "../application/usecase/authentication/LoginUsecase";
import { RefreshTokenUsecase } from "../application/usecase/authentication/RefreshTokenUsecase";
import { GetProfileUsecase } from "../application/usecase/profile/GetProfileUsecase";
import { UpdateProfileUsecase } from "../application/usecase/profile/UpdateProfileUsecase";
import { DeleteProfileUsecase } from "../application/usecase/profile/DeleteProfileUsecase";
import { SendMessageToUserUsecase } from "../application/usecase/messages/SendMessageToUserUsecase";
import { SendMessageToRoomUsecase } from "../application/usecase/messages/SendMessageToRoomUsecase";
import { EditMessageUsecase } from "../application/usecase/messages/EditMessageUsecase";
import { DeleteMessageUsecase } from "../application/usecase/messages/DeleteMessageUsecase";
import { GetMessageUsecase } from "../application/usecase/messages/GetMessageUsecase";
import { UpdateMessageStatusUsecase } from "../application/usecase/messages/UpdateMessageStatusUsecase";
import { GetRoomMessagesUsecase } from "../application/usecase/messages/GetRoomMessagesUsecase";
import { GetUserRoomsUsecase } from "../application/usecase/room/GetUserRoomsUsecase";
import { GetRoomUsecase } from "../application/usecase/room/GetRoomUsecase";

// Controllers
import { AuthController } from "../api/controller/AuthController";
import { ProfileController } from "../api/controller/ProfileController";
import { MessageController } from "../api/controller/MessageController";
import { RoomController } from "../api/controller/RoomController";

const container = new Container();

// Bind Repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container
  .bind<ISessionRepository>(TYPES.ISessionRepository)
  .to(SessionRepository);
container.bind<IRoomRepository>(TYPES.IRoomRepository).to(RoomRepository);
container
  .bind<IMessageRepository>(TYPES.IMessageRepository)
  .to(MessageRepository);

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
container
  .bind<SendMessageToUserUsecase>(TYPES.SendMessageToUserUsecase)
  .to(SendMessageToUserUsecase);
container
  .bind<SendMessageToRoomUsecase>(TYPES.SendMessageToRoomUsecase)
  .to(SendMessageToRoomUsecase);
container
  .bind<EditMessageUsecase>(TYPES.EditMessageUsecase)
  .to(EditMessageUsecase);
container
  .bind<DeleteMessageUsecase>(TYPES.DeleteMessageUsecase)
  .to(DeleteMessageUsecase);
container
  .bind<GetMessageUsecase>(TYPES.GetMessageUsecase)
  .to(GetMessageUsecase);
container
  .bind<UpdateMessageStatusUsecase>(TYPES.UpdateMessageStatusUsecase)
  .to(UpdateMessageStatusUsecase);
container
  .bind<GetRoomMessagesUsecase>(TYPES.GetRoomMessagesUsecase)
  .to(GetRoomMessagesUsecase);
container
  .bind<GetUserRoomsUsecase>(TYPES.GetUserRoomsUsecase)
  .to(GetUserRoomsUsecase);
container.bind<GetRoomUsecase>(TYPES.GetRoomUsecase).to(GetRoomUsecase);

// Bind Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
  .bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController);
container
  .bind<MessageController>(TYPES.MessageController)
  .to(MessageController);
container.bind<RoomController>(TYPES.RoomController).to(RoomController);

export { container };
