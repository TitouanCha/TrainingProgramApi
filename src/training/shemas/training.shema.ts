import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Types } from "mongoose";


@Schema({ timestamps: true })
export class Training {
    @Prop({
        type: MongooseSchema.Types.ObjectId, ref: 'Prepa',
        required: true
    })
    idPrepa: Types.ObjectId;

    @Prop({ 
        type: MongooseSchema.Types.ObjectId, ref: 'Step',
        required: false 
    })
    idStep: Types.ObjectId;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    description: string;

    @Prop({ 
        type: MongooseSchema.Types.ObjectId, ref: 'User',
        required: true 
    })
    createdBy: Types.ObjectId
}
export const TrainingSchema = SchemaFactory.createForClass(Training);