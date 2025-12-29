import { MessageOutput } from "../../application/dto/message-dto";
import { MessageStatus } from "../../domain/entities/message-entity";

export abstract class MessageResponseMapper {
  static toMessageResponse(
    messageOutput: MessageOutput,
    message: string,
    code: number
  ) {
    return {
      status: "success",
      message,
      code,
      data: {
        id: messageOutput.id,
        text: messageOutput.text,
        sender: {
          id: messageOutput.sender.id,
          name: messageOutput.sender.isDeleted
            ? "deleted_user"
            : messageOutput.sender.username,
          profilePictureUrl: messageOutput.sender.isDeleted
            ? null
            : messageOutput.sender.profilePictureUrl,
        },
        status: messageOutput.status,
        deletedAt: messageOutput.deletedAt,
        sentAt: messageOutput.sentAt,
        readAt: messageOutput.readAt,
        createdAt: messageOutput.createdAt,
        updatedAt: messageOutput.updatedAt,
      },
    };
  }

  static toMessageListResponse(
    messageOutputs: MessageOutput[],
    message: string,
    code: number
  ) {
    return {
      status: "success",
      message,
      code,
      data: messageOutputs.map((messageOutput) => ({
        id: messageOutput.id,
        text:
          messageOutput.status !== MessageStatus.DELETED
            ? messageOutput.text
            : "This message has been deleted",
        sender: {
          id: messageOutput.sender.id,
          name: messageOutput.sender.isDeleted
            ? "deleted_user"
            : messageOutput.sender.username,
          profilePictureUrl: messageOutput.sender.isDeleted
            ? null
            : messageOutput.sender.profilePictureUrl,
        },
        status: messageOutput.status,
        sentAt: messageOutput.sentAt,
      })),
    };
  }
}
