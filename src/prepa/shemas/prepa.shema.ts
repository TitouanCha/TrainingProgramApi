import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class Prepa{
    @Prop({ required: true})
    name: string;
    
    @Prop({ required: true})
    startDate: Date;

    //@Prop({ required: true})
    //endDate: Date;

    @Prop({
        type: MongooseSchema.Types.ObjectId, ref: 'Race',
        required: true
    })
    idRace: string;

    @Prop({
        type: [{type: MongooseSchema.Types.ObjectId, ref: 'User'}],
        required: true
    })
    userList: string[];

    @Prop({ required: false })
    description: string;
}

export const PrepaSchema = SchemaFactory.createForClass(Prepa);
