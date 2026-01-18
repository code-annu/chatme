import { ProfileOutput } from "../../application/dto/profile-dto";

export abstract class ProfileResponse {
  public static toSingle(
    profile: ProfileOutput,
    message: string,
    code: number,
  ) {
    return {
      status: "success",
      code,
      message,
      data: {
        id: profile.id,
        email: profile.isDeleted ? "chatme_user" : profile.email,
        firstName: profile.isDeleted ? "Chatme User" : profile.firstName,
        lastName: profile.isDeleted ? null : profile.lastName,
        bio: profile.isDeleted ? null : profile.bio,
        avatarUrl: profile.isDeleted ? null : profile.avatarUrl,
        isVerified: profile.isDeleted ? false : profile.isVerified,
        lastActiveAt: profile.isDeleted ? null : profile.lastActiveAt,
        isOnline: profile.isDeleted ? false : profile.isOnline,
        createdAt: profile.isDeleted ? null : profile.createdAt,
        updatedAt: profile.isDeleted ? null : profile.updatedAt,
      },
    };
  }

  public static toList(
    profiles: ProfileOutput[],
    message: string,
    code: number,
  ) {
    return {
      status: "success",
      code,
      message,
      data: profiles.map((profile) => ({
        id: profile.id,
        email: profile.isDeleted ? "chatme_user" : profile.email,
        firstName: profile.isDeleted ? "Chatme User" : profile.firstName,
        lastName: profile.isDeleted ? null : profile.lastName,
        avatarUrl: profile.isDeleted ? null : profile.avatarUrl,
        isVerified: profile.isDeleted ? false : profile.isVerified,
        isOnline: profile.isDeleted ? false : profile.isOnline,
      })),
    };
  }
}
