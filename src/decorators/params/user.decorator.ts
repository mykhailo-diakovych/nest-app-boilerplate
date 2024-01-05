import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext
} from "@nestjs/common";

// inject user object using params in controller
export const User = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request && request.hasOwnProperty("user")) {
      return request.user;
    } else {
      throw new BadRequestException("User object not found in request");
    }
  }
);
