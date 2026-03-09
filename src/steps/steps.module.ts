import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Step, StepSchema } from "./shemas/step.shema";
import { StepsController } from "./steps.controller";
import { StepsService } from "./steps.service";
import { Prepa, PrepaSchema } from "src/prepa/shemas/prepa.shema";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { Training, TrainingSchema } from "src/training/shemas/training.shema";
import { TrainingService } from "src/training/training.service";
import { TrainingModule } from "src/training/training.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Step.name, schema: StepSchema},
            { name: Prepa.name, schema: PrepaSchema},
            { name: Training.name, schema: TrainingSchema}
        ]),
        TrainingModule
    ],
    controllers: [StepsController],
    providers: [StepsService],
    exports: [StepsService]
})
export class StepsModule {}