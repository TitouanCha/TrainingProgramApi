import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UserRole } from "./enums/user-role.enum";



@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ 
            name: createUserDto.name 
        });
        if(existingUser) {
            throw new ConflictException('Name already in use');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            role: createUserDto.role || UserRole.USER
        });

        return newUser.save();
    }

    async findByName(name: string): Promise<User| null> {
        return this.userModel.findOne({ name }).select('+password').exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }
    
    async updateRole(userId: string, role: UserRole): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select('-password').exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-password').exec();
    }
}