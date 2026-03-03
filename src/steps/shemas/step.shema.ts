import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Mongoose, Schema as MongooseSchema } from "mongoose";


@Schema({ timestamps: true })
export class Step {
    @Prop({ 
        type: MongooseSchema.Types.ObjectId, ref: 'Prepa',
        required: true 
    })
    idPrepa: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({
        type: MongooseSchema.Types.ObjectId, ref: 'User',
        required: true 
    })
    createdBy: string;

}
export const StepSchema = SchemaFactory.createForClass(Step);