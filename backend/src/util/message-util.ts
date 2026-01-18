import { MessageStatus } from "../domain/entity/message-entity";
import { UnprocessableError } from "../domain/error/UnprocessableError";

export abstract class MessageUtil {
  private static readonly statusSequenceList = [
    MessageStatus.PENDING,
    MessageStatus.SENT,
    MessageStatus.DELIVERED,
    MessageStatus.READ,
    MessageStatus.DELETED,
  ];

  public static validateMessageStatus(
    currentStatus: MessageStatus,
    newStatus: MessageStatus,
  ) {
    const currentIndex = this.statusSequenceList.indexOf(currentStatus);
    const newIndex = this.statusSequenceList.indexOf(newStatus);

    if (newIndex <= currentIndex) {
      throw new UnprocessableError("Invalid message status transition!");
    }
  }
}
