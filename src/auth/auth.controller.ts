import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Body, Post } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { GetUser } from "./decorators/get-user.decorator";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async register(@Body() CreateUserDto: CreateUserDto) {
        return this.authService.register(CreateUserDto);
    }

    @Post('login')
    async login(@Body() CreateUserDto: CreateUserDto) {
        return this.authService.login(CreateUserDto);
    }

}