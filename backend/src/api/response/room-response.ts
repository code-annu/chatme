import { RoomOutput } from "../../application/dto/room-dto";
import { MessageStatus } from "../../domain/entities/message-entity";

export abstract class RoomResponseMapper {
  static toRoomDetailsResponse(
    room: RoomOutput,
    message: string,
    code: number
  ) {
    const roomMembers = room.members.map((member) => {
      return {
        id: member.id,
        username: member.isDeleted ? "deleted_user" : member.username,
        profilePictureUrl: member.isDeleted ? null : member.profilePictureUrl,
        isDeleted: member.isDeleted,
      };
    });
    const { lastMessage } = room;

    const roomLastMessage = lastMessage
      ? {
          id: lastMessage.id,
          text:
            lastMessage.status !== MessageStatus.DELETED
              ? lastMessage.text
              : "This message has been deleted",
          status: lastMessage.status,
          sentAt: lastMessage.sentAt,
        }
      : null;

    const { lastMessageSender } = room;
    const roomLastMessageSender = lastMessageSender
      ? {
          id: lastMessageSender.id,
          username: lastMessageSender.isDeleted
            ? "deleted_user"
            : lastMessageSender.username,
          profilePictureUrl: lastMessageSender.isDeleted
            ? null
            : lastMessageSender.profilePictureUrl,
          isDeleted: lastMessageSender.isDeleted,
        }
      : null;

    return {
      status: "success",
      code,
      message,
      data: {
        id: room.id,
        type: room.type,
        members: roomMembers,
        lastMessage: {
          ...roomLastMessage,
          sender: roomLastMessageSender,
        },
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
      },
    };
  }

  static toRoomListResponse(room: RoomOutput[], message: string, code: number) {
    return {
      status: "success",
      code,
      message,
      data: room.map((room) => {
        const roomMembers = room.members.map((member) => {
          return {
            id: member.id,
            username: member.isDeleted ? "deleted_user" : member.username,
            profilePictureUrl: member.isDeleted
              ? null
              : member.profilePictureUrl,
            isDeleted: member.isDeleted,
          };
        });

        const { lastMessage } = room;
        const roomLastMessage = lastMessage
          ? {
              id: lastMessage.id,
              text:
                lastMessage.status !== MessageStatus.DELETED
                  ? lastMessage.text
                  : "This message has been deleted",
              status: lastMessage.status,
              sentAt: lastMessage.sentAt,
            }
          : null;

        const { lastMessageSender } = room;
        const roomLastMessageSender = lastMessageSender
          ? {
              id: lastMessageSender.id,
              username: lastMessageSender.isDeleted
                ? "deleted_user"
                : lastMessageSender.username,
              profilePictureUrl: lastMessageSender.isDeleted
                ? null
                : lastMessageSender.profilePictureUrl,
              isDeleted: lastMessageSender.isDeleted,
            }
          : null;

        return {
          id: room.id,
          type: room.type,
          members: roomMembers,
          lastMessage: {
            ...roomLastMessage,
            sender: roomLastMessageSender,
          },
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        };
      }),
    };
  }
}
