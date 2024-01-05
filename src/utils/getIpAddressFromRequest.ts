import { Request } from "express";

export const getIpAddressFromRequest = (req: Request) => {
  const ipAddress =
    (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress;
  const splittedIpAddress = ipAddress.split(":");
  return splittedIpAddress.pop();
};
