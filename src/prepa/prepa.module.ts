import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { Prepa, PrepaSchema } from "./shemas/prepa.shema";
import { PrepaController } from "./prepa.controller";
import { PrepaService } from "./prepa.service";
import { Race, RaceSchema } from "src/race/schemas/race.shema";
import { User, UserSchema } from "src/users/schemas/user.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Prepa.name, schema: PrepaSchema},
            { name: Race.name, schema: RaceSchema},
            { name: User.name, schema: UserSchema}
        ])
    ],
    controllers: [PrepaController],
    providers: [PrepaService],
    exports: [PrepaService]
})
export class PrepaModule {}