import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { PrepaService } from "./prepa.service";
import { PrepaDto } from "./dto/prepa.dto";


@Controller('prepa')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrepaController {
    constructor(private prepaService: PrepaService){}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getPrepaByUsuerId(@Req() req){
        const userId = req.user.userId;
        return this.prepaService.getPrepaByUserId(userId);
    }

    @Patch(':id/runners/me')
    @UseGuards(JwtAuthGuard)
    async addLogedUserToPrepa(@Param('id') prepaId: string,  @Req() req){
        const userId = req.user.userId;
        return this.prepaService.addLogedUserToPrepa(prepaId, userId);
    }

    @Patch(':id/runners')
    @UseGuards(JwtAuthGuard)
    async addRunnerToPrepa(@Param('id') prepaId: string, @Body() runnerList: string[], @Req() req){
        const userId = req.user.userId;
        return this.prepaService.addRunnersListToPrepa(prepaId, runnerList, userId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getPrepaById(@Param('id') prepaId: string){
        return this.prepaService.getPrepaById(prepaId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllPrepa() {
        return this.prepaService.getAllPrepa();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createPrepa(@Body() prepaDto: PrepaDto, @Req() req) {
        const userId = req.user.userId;
        return this.prepaService.createPrepa(prepaDto, userId);
    }
    
}