import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Step } from "./shemas/step.shema";
import { Model } from "mongoose";
import { Prepa } from "src/prepa/shemas/prepa.shema";
import { User } from "src/users/schemas/user.schema";
import { StepDto } from "./dto/step.dto";


@Injectable()
export class StepsService {
    constructor(
        @InjectModel(Step.name) private stepModel: Model<Step>,
        @InjectModel(Prepa.name) private prepaModel: Model<Prepa>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async createSteps(stepListDto: StepDto[], UserId: string, prepaId: string): Promise<Step[]>{
        const existingPrepa = await this.prepaModel.findById(prepaId).exec();
        if(!existingPrepa){
            throw new BadRequestException(`Prepa not found`);
        }

        for(const stepDto of stepListDto){
            const steps = new this.stepModel({
                ...stepDto,
                createdBy: UserId,
                idPrepa: prepaId
            });
            const savedSteps = await steps.save();
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
}