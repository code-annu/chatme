export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IRoomRepository: Symbol.for("IRoomRepository"),
  IMessageRepository: Symbol.for("IMessageRepository"),

  // Auth Usecases
  SignupUsecase: Symbol.for("SignupUsecase"),
  LoginUsecase: Symbol.for("LoginUsecase"),
  RefreshTokenUsecase: Symbol.for("RefreshTokenUsecase"),

  // Profile Usecases
  GetProfileUsecase: Symbol.for("GetProfileUsecase"),
  UpdateProfileUsecase: Symbol.for("UpdateProfileUsecase"),
  DeleteProfileUsecase: Symbol.for("DeleteProfileUsecase"),

  // Message Usecases
  SendMessageToUserUsecase: Symbol.for("SendMessageToUserUsecase"),
  SendMessageToRoomUsecase: Symbol.for("SendMessageToRoomUsecase"),
  EditMessageUsecase: Symbol.for("EditMessageUsecase"),
  DeleteMessageUsecase: Symbol.for("DeleteMessageUsecase"),
  GetMessageUsecase: Symbol.for("GetMessageUsecase"),
  UpdateMessageStatusUsecase: Symbol.for("UpdateMessageStatusUsecase"),
  GetRoomMessagesUsecase: Symbol.for("GetRoomMessagesUsecase"),

  // Room Usecases
  GetUserRoomsUsecase: Symbol.for("GetUserRoomsUsecase"),
  GetRoomUsecase: Symbol.for("GetRoomUsecase"),

  // Controllers
  AuthController: Symbol.for("AuthController"),
  ProfileController: Symbol.for("ProfileController"),
  MessageController: Symbol.for("MessageController"),
  RoomController: Symbol.for("RoomController"),
};
