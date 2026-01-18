import { RoomOutput } from "../../application/dto/room-dto";
import { MessageStatus } from "../../domain/entity/message-entity";

export abstract class RoomResponse {
  public static toSingle(
    roomOutput: RoomOutput,
    message: string,
    code: number,
  ) {
    const { members, lastMessage, lastMessageSender } = roomOutput;
    const roomMembers = members.map((member) => {
      return {
        id: member.id,
        email: member.isDeleted ? "chatme_user" : member.email,
        firstName: member.isDeleted ? "Chatme User" : member.firstName,
        lastName: member.isDeleted ? null : member.lastName,
        avatarUrl: member.isDeleted ? null : member.avatarUrl,
      };
    });

    const lastMessageSenderData = lastMessageSender
      ? {
          id: lastMessageSender.id,
          email: lastMessageSender.isDeleted
            ? "chatme_user"
            : lastMessageSender.email,
          firstName: lastMessageSender.isDeleted
            ? "Chatme User"
            : lastMessageSender.firstName,
          lastName: lastMessageSender.isDeleted
            ? null
            : lastMessageSender.lastName,
          avatarUrl: lastMessageSender.isDeleted
            ? null
            : lastMessageSender.avatarUrl,
        }
      : null;

    const lastMessageDeleted = lastMessage
      ? lastMessage.status === MessageStatus.DELETED
      : false;

    const lastMessageData = lastMessage
      ? {
          id: lastMessage.id,
          text: lastMessageDeleted
            ? "This message has been deleted"
            : lastMessage.text,
          sentAt: lastMessageDeleted ? null : lastMessage.createdAt,
          sender: lastMessageSenderData,
          status: lastMessage.status,
        }
      : null;

    return {
      status: "success",
      message,
      code,
      data: {
        id: roomOutput.id,
        type: roomOutput.type,
        members: roomMembers,
        lastMessage: lastMessageData,
        createdAt: roomOutput.createdAt,
        updatedAt: roomOutput.updatedAt,
      },
    };
  }

  public static toList(
    roomOutputs: RoomOutput[],
    message: string,
    code: number,
  ) {
    return {
      status: "success",
      message,
      code,
      data: roomOutputs.map((roomOutput) => {
        const { members, lastMessage, lastMessageSender } = roomOutput;
        const roomMembers = members.map((member) => {
          return {
            id: member.id,
            email: member.isDeleted ? "chatme_user" : member.email,
            firstName: member.isDeleted ? "Chatme User" : member.firstName,
            lastName: member.isDeleted ? null : member.lastName,
            avatarUrl: member.isDeleted ? null : member.avatarUrl,
          };
        });

        const lastMessageSenderData = lastMessageSender
          ? {
              id: lastMessageSender.id,
              email: lastMessageSender.isDeleted
                ? "chatme_user"
                : lastMessageSender.email,
              firstName: lastMessageSender.isDeleted
                ? "Chatme User"
                : lastMessageSender.firstName,
              lastName: lastMessageSender.isDeleted
                ? null
                : lastMessageSender.lastName,
              avatarUrl: lastMessageSender.isDeleted
                ? null
                : lastMessageSender.avatarUrl,
            }
          : null;

        const lastMessageDeleted = lastMessage
          ? lastMessage.status === MessageStatus.DELETED
          : false;

        const lastMessageData = lastMessage
          ? {
              id: lastMessage.id,
              text: lastMessageDeleted
                ? "This message has been deleted"
                : lastMessage.text,
              sentAt: lastMessageDeleted ? null : lastMessage.createdAt,
              sender: lastMessageDeleted ? null : lastMessageSenderData,
              status: lastMessage.status,
            }
          : null;

        return {
          id: roomOutput.id,
          type: roomOutput.type,
          members: roomMembers,
          lastMessage: lastMessageData,
        };
      }),
    };
  }
}
