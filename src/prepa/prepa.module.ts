import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { Prepa, PrepaSchema } from "./shemas/prepa.shema";
import { PrepaController } from "./prepa.controller";
import { PrepaService } from "./prepa.service";
import { Race, RaceSchema } from "src/race/schemas/race.shema";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { Step, StepSchema } from "src/steps/shemas/step.shema";
import { StepsService } from "src/steps/steps.service";
import { TrainingService } from "src/training/training.service";
import { Training, TrainingSchema } from "src/training/shemas/training.shema";
import { UsersService } from "src/users/users.service";
import { RaceService } from "src/race/race.service";
import { StepsModule } from "src/steps/steps.module";
import { TrainingModule } from "src/training/training.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Prepa.name, schema: PrepaSchema},
            { name: Race.name, schema: RaceSchema},
            { name: User.name, schema: UserSchema},
            { name: Step.name, schema: StepSchema}
        ]),
        StepsModule,
        TrainingModule
    ],
    controllers: [PrepaController],
    providers: [PrepaService],
    exports: [PrepaService]
})
export class PrepaModule {}