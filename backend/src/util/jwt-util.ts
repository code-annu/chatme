import jwt from "jsonwebtoken";
import ms, { StringValue } from "ms";
import dotenv from "dotenv";

dotenv.config();

export interface JWTPayload {
  userId: string;
  email: string;
}

export interface Token {
  token: string;
  expiresAt: Date;
}

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
const ACCESS_TOKEN_EXPIRE = (process.env.JWT_ACCESS_EXPIRES_IN! ||
  "24h") as StringValue;

const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;
const REFRESH_TOKEN_EXPIRE = (process.env.JWT_REFRESH_EXPIRES_IN ||
  "30d") as StringValue;

export const generateAccessToken = (payload: JWTPayload): Token => {
  const expiresAt = new Date(Date.now() + ms(ACCESS_TOKEN_EXPIRE));
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });
  return { token, expiresAt };
};

export const generateRefreshToken = (payload: JWTPayload): Token => {
  const expiresAt = new Date(Date.now() + ms(REFRESH_TOKEN_EXPIRE));
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  });
  return { token, expiresAt };
};

export const generateTokens = (
  payload: JWTPayload,
): { accessToken: Token; refreshToken: Token } => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;
};
