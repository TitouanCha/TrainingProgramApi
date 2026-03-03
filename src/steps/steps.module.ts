import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Step, StepSchema } from "./shemas/step.shema";
import { StepsController } from "./steps.controller";
import { StepsService } from "./steps.service";
import { Prepa } from "src/prepa/shemas/prepa.shema";
import { User } from "src/users/schemas/user.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Step.name, schema: StepSchema},
            { name: Prepa.name, schema: StepSchema},
            { name: User.name, schema: StepSchema}
        ])
    ],
    controllers: [StepsController],
    providers: [StepsService],
    exports: [StepsService]
})
export class StepsModule {}