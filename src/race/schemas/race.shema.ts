import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { RaceType } from "../enums/race-type.enum";

@Schema({ timestamps: true })
export class Race extends Document{
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    type: RaceType;

    @Prop({required: true})
    distance: Number;

    @Prop({required: true})
    location: string;

    @Prop({required: false})
    goal: string;

    @Prop({required: false})
    descrition: string;

    @Prop({required: false})
    result: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId, ref: 'Prepa',
        required: false
    })
    idPrepa: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId, ref: 'User',
        required: true
    })
    createdBy: string;

}
export const RaceSchema = SchemaFactory.createForClass(Race);