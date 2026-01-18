import { AuthOutput } from "../../application/dto/auth-dto";

export abstract class AuthResponse {
  public static toSingle(
    authOutput: AuthOutput,
    message: string,
    code: number,
  ) {
    const { user, session } = authOutput;
    return {
      status: "success",
      code,
      message,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
        },
        session: session,
      },
    };
  }
}
