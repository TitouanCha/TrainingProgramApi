import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { RaceService } from "./race.service";
import { CreateRaceDto } from "./dto/create-race.dto";
import { UpdateRaceDto } from "./dto/update-race.dto";


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
    async createRace(@Body() createRaceDto: CreateRaceDto, @Req() req) {
        const userId = req.user.userId;
        return this.racesService.createRace(createRaceDto, userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateRace(@Body()  updateRaceDto: UpdateRaceDto, @Param('id') raceId: string, @Req() req){
        const userId = req.user.userId
        return this.racesService.updateRace(raceId, updateRaceDto, userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteRace(@Param('id') raceId: string, @Req() req){
        const userId = req.user.userId
        return this.racesService.deleteRace(raceId, userId);
    }
}