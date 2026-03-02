import { MongooseModule } from "@nestjs/mongoose";
import { Race, RaceSchema } from "./schemas/race.shema";
import { Module } from "@nestjs/common";
import { RaceController } from "./race.controller";
import { RaceService } from "./race.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Race.name, schema: RaceSchema}])
    ],
    controllers: [RaceController],
    providers: [RaceService],
    exports: [RaceService]
})
export class RaceModule {}