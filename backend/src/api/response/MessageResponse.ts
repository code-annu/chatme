import { MessageOutput } from "../../application/dto/message-dto";
import { MessageStatus } from "../../domain/entity/message-entity";

export abstract class MessageResponse {
  public static toSingle(
    messageOutput: MessageOutput,
    message: string,
    code: number,
  ) {
    const { sender } = messageOutput;
    const messageDeleted = messageOutput.status === MessageStatus.DELETED;

    return {
      status: "success",
      message,
      code,
      data: {
        id: messageOutput.id,
        text: messageDeleted
          ? "This message has been deleted"
          : messageOutput.text,
        sentAt: messageDeleted ? null : messageOutput.createdAt,
        readAt: messageDeleted ? null : messageOutput.readAt,
        deliveredAt: messageDeleted ? null : messageOutput.deliveredAt,
        isEdited: messageDeleted ? false : messageOutput.isEdited,
        sender: {
          id: sender.id,
          email: sender.isDeleted ? "chatme_user" : sender.email,
          firstName: sender.isDeleted ? "Chatme User" : sender.firstName,
          lastName: sender.isDeleted ? null : sender.lastName,
          avatarUrl: sender.isDeleted ? null : sender.avatarUrl,
        },
        status: messageOutput.status,
      },
    };
  }

  public static toList(
    messageOutputs: MessageOutput[],
    message: string,
    code: number,
  ) {
    return {
      status: "success",
      message,
      code,
      data: messageOutputs.map((messageOutput) => {
        const { sender } = messageOutput;
        const messageDeleted = messageOutput.status === MessageStatus.DELETED;
        return {
          id: messageOutput.id,
          text: messageDeleted
            ? "This message has been deleted"
            : messageOutput.text,
          sentAt: messageDeleted ? null : messageOutput.createdAt,
          isEdited: messageDeleted ? false : messageOutput.isEdited,
          sender: {
            id: sender.id,
            email: sender.isDeleted ? "chatme_user" : sender.email,
            firstName: sender.isDeleted ? "Chatme User" : sender.firstName,
            lastName: sender.isDeleted ? null : sender.lastName,
            avatarUrl: sender.isDeleted ? null : sender.avatarUrl,
          },
          status: messageOutput.status,
        };
      }),
    };
  }
}
