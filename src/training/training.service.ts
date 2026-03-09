import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Training } from "./shemas/training.shema";
import { Model } from "mongoose";
import { TrainingDto } from "./dto/training.dto";
import { Prepa } from "src/prepa/shemas/prepa.shema";
import { Step } from "src/steps/shemas/step.shema";
import { isMongoId } from "class-validator";
import { frDateTransform } from "src/utils/utils";


@Injectable()
export class TrainingService {
    constructor(
        @InjectModel(Training.name) private trainingModel: Model<Training>,
        @InjectModel(Prepa.name) private prepaModel: Model<Prepa>,
        @InjectModel(Step.name) private stepModel: Model<Step>,
    ) {}

    async createTraining(trainingDto: TrainingDto, prepaId: string, userId: string): Promise<Training> {
        const prepa = await this.prepaModel.findById(prepaId);
        if(!prepa) {
            throw new BadRequestException('Prepa not found');
        }
        if(prepa.createdBy.toString() !== userId) {
            throw new ForbiddenException('You are not the creator of this Prepa');
        }

        const steps = await this.stepModel.find({ idPrepa: prepaId });
        var stepId: string | null = null;

        const startDate: Date = frDateTransform(trainingDto.startDate)
        const endDate: Date = frDateTransform(trainingDto.endDate)

        for (const step of steps) {
            if(step.startDate <= startDate && step.endDate >= endDate) {
                stepId = step._id.toString();
                break;
            }
        }

        const training = new this.trainingModel({
            idPrepa: prepaId,
            idStep: stepId,
            ...trainingDto,
            startDate: startDate,
            endDate: endDate,
        });
        return training.save();
    }

    async getTrainingsByPrepaId(idPrepa: string): Promise<Training[]> {
        if(!isMongoId(idPrepa)) {
            throw new Error('Invalid Prepa ID');
        }
        const prepa = await this.prepaModel.findById(idPrepa);
        if(!prepa) {
            throw new Error('Prepa not found');
        }
        return this.trainingModel.find({ idPrepa })
            .select('-idPrepa')
            .populate('idStep', '-__v -createdAt -updatedAt -idPrepa')
            .populate('createdBy', 'id name')
        .exec();
    }

    async getTrainingsByStepId(idStep: string): Promise<Training[]> {
        if(!isMongoId(idStep)) {
            throw new Error('Invalid Step ID');
        }
        const step = await this.stepModel.findById(idStep);
        if(!step) {
            throw new Error('Step not found');
        }
        return this.trainingModel.find({ idStep })
            .select('-idPrepa')
            .populate('idStep', '-__v -createdAt -updatedAt -idPrepa')
            .populate('createdBy', 'id name')
        .exec();
    }

    async getTrainingById(id: string): Promise<Training> {
        if(!isMongoId(id)) {
            throw new Error('Invalid Training ID');
        }
        const training = await this.trainingModel.findById(id)
            .populate('idPrepa', '-__v -createdAt -updatedAt')
            .populate('idStep', '-__v -createdAt -updatedAt -idPrepa')
            .populate('createdBy', 'id name')
        .exec();
        if(!training) {
            throw new Error('Training not found');
        }
        return training;
    }

    async getAllTrainings(): Promise<Training[]> {
        return this.trainingModel.find()
            .populate('idPrepa', '-__v -createdAt -updatedAt')
            .populate('idStep', '-__v -createdAt -updatedAt -idPrepa')
            .populate('createdBy', 'id name')
        .exec();
    }

}