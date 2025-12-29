import { z } from "zod";
import { RoomType } from "../../domain/entities/room-entity";

export const createRoomSchema = z.object({
  memberIds: z
    .array(z.string().min(1, "Member ID is required"))
    .min(1, "At least one member is required"),
  type: z.enum(
    Object.values(RoomType),
    "type should be one of " + Object.values(RoomType).join(", ")
  ),
});
