import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Training, TrainingSchema } from "./shemas/training.shema";
import { TrainingController } from "./training.controller";
import { TrainingService } from "./training.service";
import { Prepa, PrepaSchema } from "src/prepa/shemas/prepa.shema";
import { Step, StepSchema } from "src/steps/shemas/step.shema";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Training.name, schema: TrainingSchema},
            { name: Prepa.name, schema: PrepaSchema},
            { name: Step.name, schema: StepSchema}
        ])
    ],
    controllers: [TrainingController],
    providers: [TrainingService],
    exports: [TrainingService]
})
export class TrainingModule {}