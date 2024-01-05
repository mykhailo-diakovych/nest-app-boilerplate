import { Request } from "express";
import * as jwt from "jsonwebtoken";

/**
 * Get current user from Authorization header JWT token
 */
export const parseUserFromRequest = (request: Request) => {
  if (!request?.headers?.authorization) {
    request.headers.authorization = "Bearer " + process.env.JWT_TOKEN;
  }
  const [, jwtToken] = request.headers.authorization.split(" ");

  const { user } = jwt.decode(jwtToken) as jwt.JwtPayload;
  return user;
};
