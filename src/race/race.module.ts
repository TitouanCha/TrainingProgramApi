import { MongooseModule } from "@nestjs/mongoose";
import { Race, RaceSchema } from "./schemas/race.shema";
import { Module } from "@nestjs/common";
import { RaceController } from "./race.controller";
import { RaceService } from "./race.service";
import { Prepa, PrepaSchema } from "src/prepa/shemas/prepa.shema";
import { Step, StepSchema } from "src/steps/shemas/step.shema";
import { PrepaService } from "src/prepa/prepa.service";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { PrepaModule } from "src/prepa/prepa.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Race.name, schema: RaceSchema},
            { name: Prepa.name, schema: PrepaSchema},
            { name: Step.name, schema: StepSchema}
            //{ name: User.name, schema: UserSchema},
        ]),
        PrepaModule
    ],
    controllers: [RaceController],
    providers: [RaceService],
    exports: [RaceService]
})
export class RaceModule {}