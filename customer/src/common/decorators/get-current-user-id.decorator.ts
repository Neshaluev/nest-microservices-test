import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtPayload = {
  username: string;
  sub: string;
};

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    return user.sub;
  },
);
