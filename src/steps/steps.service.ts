import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Step } from "./shemas/step.shema";
import { Model } from "mongoose";
import { Prepa } from "src/prepa/shemas/prepa.shema";
import { User } from "src/users/schemas/user.schema";
import { StepDto } from "./dto/step.dto";
import { UpdateStepDto } from "./dto/update-steps.dto";
import { Training } from "src/training/shemas/training.shema";
import { Console } from "console";
import { frDateTransform } from "src/utils/utils";


@Injectable()
export class StepsService {
    constructor(
        @InjectModel(Step.name) private stepModel: Model<Step>,
        @InjectModel(Prepa.name) private prepaModel: Model<Prepa>,
        @InjectModel(Training.name) private trainingModel: Model<Training>,
    ) {}

    async createSteps(stepListDto: StepDto[], UserId: string, prepaId: string): Promise<Step[]>{
        const existingPrepa = await this.prepaModel.findById(prepaId).exec();
        if(!existingPrepa){
            throw new BadRequestException(`Prepa not found`);
        }
        if(existingPrepa.createdBy.toString() !== UserId){
            throw new BadRequestException(`Only the creator of the prepa can add steps`);
        }
        const trainings = await this.trainingModel.find({ idPrepa: prepaId }).exec();
        var startDate: Date
        var endDate: Date
        for(const stepDto of stepListDto){
            startDate = frDateTransform(stepDto.startDate)
            endDate = frDateTransform(stepDto.endDate)
            const step = new this.stepModel({
                ...stepDto,
                startDate: startDate,
                endDate: endDate,
                createdBy: UserId,
                idPrepa: prepaId
            });
            const savedStep = await step.save();

            for(const training of trainings){
                if(startDate <= training.startDate && endDate >= training.endDate) {
                    await this.trainingModel.findByIdAndUpdate(
                        training._id,
                        { idStep: savedStep._id },
                        { new: true }
                    ).exec();
                }
            }
        }

        return this.stepModel.find({ idPrepa: prepaId })
            .populate('createdBy', '_id name')
        .exec();
    }

    async getStepsByPrepaId(prepaId: string): Promise<any> {
        const existingPrepa = await this.prepaModel.findById(prepaId)
            .select('-__v -updatedAt -userList')
            .populate('createdBy', '_id name')
            .populate('idRace', '-__v -createdAt -updatedAt')
        .exec()
        if(!existingPrepa){
            throw new BadRequestException(`Prepa not found`);
        }
        const steps = await this.stepModel.find({ idPrepa: prepaId })
            .select('-__v -createdAt -updatedAt -idPrepa -createdBy')
        .exec();
        return {
            prepa: existingPrepa,
            steps: steps
        }
    }

    async getStepById(stepId: string): Promise<Step> {
        const step = await this.stepModel.findById(stepId)
            .select('-__v -createdAt -updatedAt')
            .populate({
                path: 'idPrepa',
                select: 'name startDate',
                populate: {
                    path: 'race',
                    select: '-__v -createdAt -updatedAt'
                }
            })
            .populate('createdBy', '_id name')
        .exec();
        if(!step){
            throw new BadRequestException(`Step not found`);
        }
        return step;
    }

    async getAllSteps(): Promise<Step[]> {
        return this.stepModel.find()
            .select('-__v -createdAt -updatedAt')
            .populate({
                path: 'idPrepa',
                select: 'name startDate',
                populate: {
                    path: 'idRace',
                    select: '-__v -createdAt -updatedAt'
                }
            })
            .populate('createdBy', '_id name')
        .exec();
    }

    async updateStep(stepId: string, updateStapeDto: UpdateStepDto, userId: string): Promise<Step>{
        const existingStep = await this.stepModel.findById(stepId).exec();
        if(existingStep && existingStep.createdBy.toString() === userId){
            throw new BadRequestException(`Only the creator can update the race`);
        }
        const updatedStep = await this.stepModel.findByIdAndUpdate(
            stepId,
            { $set: updateStapeDto },
            { new: true }
        )
        .exec();
        
        if(!updatedStep){
            throw new BadRequestException(`Step not found`);
        }

        return updatedStep
    }

    async deleteStep(stepId: string, userId: string) {
        const existingStep = await this.stepModel.findById(stepId).exec();
        if(existingStep && existingStep.createdBy.toString() === userId){
            throw new BadRequestException(`Only the creator can delete the step`);
        }
        const deletedStep = await this.stepModel.findByIdAndDelete(stepId).exec();
        
        if(!deletedStep){
            throw new BadRequestException(`Step not found`);
        }

        return { message: `Step successfully deleted` }
    }
}