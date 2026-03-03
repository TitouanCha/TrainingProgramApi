import { PartialType } from "@nestjs/mapped-types";
import { CreateRaceDto } from "src/race/dto/create-race.dto";


export class UpdatePrepaDto extends PartialType(CreateRaceDto) {}