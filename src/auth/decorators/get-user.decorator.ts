import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ExecException } from "child_process";


export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)