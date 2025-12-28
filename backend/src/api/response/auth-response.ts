import { AuthOutput } from "../../application/dto/auth-dto";

export abstract class AuthResponseMapper {
  static mapToAuthResponse(
    authOutput: AuthOutput,
    message: string,
    code: number
  ) {
    return {
      status: "success",
      message,
      code,
      data: {
        user: {
          id: authOutput.user.id,
          username: authOutput.user.username,
          createdAt: authOutput.user.createdAt,
        },
        accessToken: authOutput.accessToken,
        refreshToken: authOutput.session.token,
      },
    };
  }
}
