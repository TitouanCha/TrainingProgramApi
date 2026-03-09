import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { PrepaService } from "./prepa.service";
import { PrepaDto } from "./dto/prepa.dto";
import { StepsService } from "src/steps/steps.service";
import { StepDto } from "src/steps/dto/step.dto";
import { UpdatePrepaDto } from "./dto/update-prepa.dto";
import { User } from "src/users/schemas/user.schema";
import { TrainingService } from "src/training/training.service";


@Controller('prepa')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrepaController {
    constructor(
        private prepaService: PrepaService,
        private stepsService: StepsService,
        private trainingService: TrainingService
    ){}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getPrepaByUsuerId(@Req() req){
        const userId = req.user.userId;
        return this.prepaService.getPrepaByUserId(userId);
    }

    @Post(':id/training')
    @UseGuards(JwtAuthGuard)
    async createTraining(@Param('id') prepaId: string, @Body() trainingDto: any, @Req() req) {
        const userId = req.user.userId;
        return this.trainingService.createTraining(trainingDto, prepaId, userId);
    }

    @Get(':id/training')
    @UseGuards(JwtAuthGuard)
    async getTrainingsByPrepaId(@Param('id') prepaId: string){
        return this.trainingService.getTrainingsByPrepaId(prepaId);
    }

    @Post(':id/steps')
    @UseGuards(JwtAuthGuard)
    async addStepsToPrepa(@Param('id') prepaId: string, @Body() stepListDto: StepDto[], @Req() req){
        const userId = req.user.userId;
        return this.stepsService.createSteps(stepListDto, userId, prepaId);
    }

    @Get(':id/steps')
    @UseGuards(JwtAuthGuard)
    async getStepsByPrepaId(@Param('id') prepaId: string){
        return this.stepsService.getStepsByPrepaId(prepaId);
    }

    @Patch(':id/runners/me')
    @UseGuards(JwtAuthGuard)
    async addLogedUserToPrepa(@Param('id') prepaId: string,  @Req() req){
        const userId = req.user.userId;
        return this.prepaService.addLogedUserToPrepa(prepaId, userId);
    }

    @Delete(':id/runners/me')
    @UseGuards(JwtAuthGuard)
    async removeLogedUserFromPrepa(@Param('id') prepaId: string,  @Req() req){
        const userId = req.user.userId;
        return this.prepaService.removeLogedUserFromPrepa(prepaId, userId);
    }

    @Patch(':id/runners')
    @UseGuards(JwtAuthGuard)
    async addRunnerToPrepa(@Param('id') prepaId: string, @Body() runnerList: string[], @Req() req){
        const userId = req.user.userId;
        return this.prepaService.addRunnersListToPrepa(prepaId, runnerList, userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updatePrepa(@Param('id') prepaId: string, @Body() updatePrepaDto: UpdatePrepaDto, @Req() req){
        const userId = req.user.userId;
        return this.prepaService.updatePrepa(prepaId, updatePrepaDto, userId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getPrepaById(@Param('id') prepaId: string){
        return this.prepaService.getPrepaById(prepaId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deletePrepa(@Param('id') prepaId: string, @Req() req){
        const userId = req.user.userId;
        return this.prepaService.deletePrepa(prepaId, userId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllPrepa() {
        return this.prepaService.getAllPrepa();
    }

}