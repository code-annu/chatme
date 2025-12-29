import { ProfileOutput } from "../../application/dto/profile-dto";

export abstract class ProfileResponseMapper {
  static toProfileDetailsResponse(
    profile: ProfileOutput,
    message: string,
    code: number
  ) {
    return {
      status: "success",
      code,
      message,
      data: {
        id: profile.id,
        username: profile.isDeleted ? "deleted_user" : profile.username,
        fullname: profile.isDeleted ? "Deleted User" : profile.fullname,
        profilePictureUrl: profile.isDeleted ? "Deleted" : null,
        bio: profile.isDeleted ? "Deleted" : null,
        isDeleted: profile.isDeleted,
        createdAt: profile.isDeleted ? null : profile.createdAt,
        updatedAt: profile.isDeleted ? null : profile.updatedAt,
      },
    };
  }

  static toProfileListResponse(
    profiles: ProfileOutput[],
    message: string,
    code: number
  ) {
    return {
      status: "success",
      code,
      message,
      data: profiles.map((profile) => {
        return {
          id: profile.id,
          username: profile.isDeleted ? "deleted_user" : profile.username,
          profilePictureUrl: profile.isDeleted ? "Deleted" : null,
          isDeleted: profile.isDeleted,
        };
      }),
    };
  }
}
