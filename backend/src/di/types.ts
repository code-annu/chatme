export const TYPES = {
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IRoomRepository: Symbol.for("IRoomRepository"),
  IMessageRepository: Symbol.for("IMessageRepository"),

  // Message usecases and controller
  SendMessageUsecase: Symbol.for("SendMessageUsecase"),
  GetMessageUsecase: Symbol.for("GetMessageUsecase"),
  GetRoomMessagesUsecase: Symbol.for("GetRoomMessagesUsecase"),
  UpdateMessageUsecase: Symbol.for("UpdateMessageUsecase"),
  UpdateMessageStatusUsecase: Symbol.for("UpdateMessageStatusUsecase"),
  DeleteMessageUsecase: Symbol.for("DeleteMessageUsecase"),
  MessageController: Symbol.for("MessageController"),

  // Auth usecases and controller
  SignupUsecase: Symbol.for("SignupUsecase"),
  LoginUsecase: Symbol.for("LoginUsecase"),
  RefreshTokenUsecase: Symbol.for("RefreshTokenUsecase"),
  AuthController: Symbol.for("AuthController"),

  // Profile usecases and controller
  UpdateProfileUsecase: Symbol.for("UpdateProfileUsecase"),
  GetProfileUsecase: Symbol.for("GetProfileUsecase"),
  DeleteProfileUsecase: Symbol.for("DeleteProfileUsecase"),
  SearchProfilesUsecase: Symbol.for("SearchProfilesUsecase"),
  ProfileController: Symbol.for("ProfileController"),

  // Room usecases and controller
  CreateRoomUsecase: Symbol.for("CreateRoomUsecase"),
  GetRoomUsecase: Symbol.for("GetRoomUsecase"),
  GetUserRoomsUsecase: Symbol.for("GetUserRoomsUsecase"),
  DeleteRoomUsecase: Symbol.for("DeleteRoomUsecase"),
  RoomController: Symbol.for("RoomController"),
};
