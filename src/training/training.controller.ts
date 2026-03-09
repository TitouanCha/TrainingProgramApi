import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "src/users/enums/user-role.enum";
import { TrainingService } from "./training.service";




@Controller('trainings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TrainingController {
    constructor( private trainingService: TrainingService ){}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getTrainingById(@Param('id') trainingId: string){
        return this.trainingService.getTrainingById(trainingId);
    }
    
    @Get()
    @UseGuards(JwtAuthGuard)
    async getTrainings(){
        return this.trainingService.getAllTrainings();
    }
}