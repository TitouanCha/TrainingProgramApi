import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
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

    @Prop({required: false})
    idPrepa: string;

}
export const RaceSchema = SchemaFactory.createForClass(Race);