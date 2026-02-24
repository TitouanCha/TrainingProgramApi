import { Controller, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UsersService } from "./users.service";
import { UserRole } from "./enums/user-role.enum";
import { Get, Post, Body } from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}
        
    @Roles(UserRole.ADMIN)
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    
}