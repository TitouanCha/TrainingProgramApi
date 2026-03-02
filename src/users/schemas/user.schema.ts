import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "../enums/user-role.enum";

@Schema({ timestamps: true})
export class User extends Document{
    

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ 
        type: String, 
        enum: UserRole,
        default: UserRole.USER
     })
     role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);