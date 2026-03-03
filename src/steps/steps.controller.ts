import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { StepsService } from "./steps.service";


@Controller('steps')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StepsController {
    constructor( private stepsService: StepsService ){}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getStepById(@Param('id') stepId: string){
        return this.stepsService.getStepById(stepId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllSteps(){
        return this.stepsService.getAllSteps();
    }
}