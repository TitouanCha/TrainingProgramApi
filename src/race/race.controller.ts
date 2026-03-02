import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { RaceService } from "./race.service";
import { CreateRaceDto } from "./dto/create-race.dto";


@Controller('race')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RaceController {
    constructor(private racesService: RaceService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllRaces() {
        return this.racesService.getAllRaces();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createRace(@Body() createRaceDto: CreateRaceDto) {
        return this.racesService.createRace(createRaceDto);
    }
}