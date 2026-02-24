import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(createUserDto: CreateUserDto){
        const user = await this.userService.create(createUserDto);

        const payload = { 
            sub: user._id, 
            email: user.email,
            role: user.role
        };
        const access_token = this.jwtService.sign(payload);

        return {
            access_token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        }
    }

    async login(loginDto: LoginDto){
        const user = await this.userService.findByEmail(loginDto.email);

        if(!user) {
            throw new UnauthorizedException('Invalid information');
        }

        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password
        );
        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid information');
        }

        const payload = { 
            sub: user._id, 
            email: user.email,
            role: user.role
        };
        const access_token = this.jwtService.sign(payload);

        return {
            access_token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        }
    }

    async validateUser(userId: string) {
        return this.userService.findById(userId);
    }
}