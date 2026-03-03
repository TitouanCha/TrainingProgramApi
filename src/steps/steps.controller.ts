import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { StepsService } from "./steps.service";
import { UpdateStepDto } from "./dto/update-steps.dto";


@Controller('steps')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StepsController {
    constructor( private stepsService: StepsService ){}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getStepById(@Param('id') stepId: string){
        return this.stepsService.getStepById(stepId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStep(@Param('id') stepId: string, @Body() updateStepDto: UpdateStepDto, @Req() req){
        const userId = req.user.id;
        return this.stepsService.updateStep(stepId, updateStepDto, userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteStep(@Param('id') stepId: string, @Req() req){
        const userId = req.user.id;
        return this.stepsService.deleteStep(stepId, userId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllSteps(){
        return this.stepsService.getAllSteps();
    }

    
}