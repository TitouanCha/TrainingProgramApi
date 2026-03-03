import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Prepa } from "./shemas/prepa.shema";
import { isValidObjectId, Model } from "mongoose";
import { PrepaDto } from "./dto/prepa.dto";
import { Race } from "src/race/schemas/race.shema";
import { User } from "src/users/schemas/user.schema";
import { UpdatePrepaDto } from "./dto/update-prepa.dto";
import { Step } from "src/steps/shemas/step.shema";


@Injectable()
export class PrepaService {
    constructor( 
        @InjectModel(Prepa.name) private prepaModel: Model<Prepa>,
        @InjectModel(Race.name) private raceModel: Model<Race>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Step.name) private stepModel: Model<Step>
    ) {}

    async createPrepa(prepaDto: PrepaDto, userId: string): Promise<Prepa> {
        const raceId = prepaDto.idRace;
        const race = await this.raceModel.findById(raceId).exec();
        if(!race){
            throw new BadRequestException(`Race not found`);
        }
        const newPrepa = new this.prepaModel(
            {
                ...prepaDto,
                createdBy: userId
            });
        const savedPrepa = await newPrepa.save();

        const prepa = await this.prepaModel
            .findById(savedPrepa._id)
            .select('-__v -createdAt -updatedAt')
            .populate('idRace', '-__v -createdAt -updatedAt -idPrepa')
            .populate('userList', '_id name')
            .populate('createdBy', '_id name')
        .exec();

        if (!prepa) {
            throw new BadRequestException(`Prepa not found`);
        }

        const updatedRace = await this.raceModel.findByIdAndUpdate(
            raceId,
            { idPrepa : prepa._id },
            { new: true }
        )
        return prepa;
    }

    async getAllPrepa(): Promise<Prepa[]> {
        return this.prepaModel.find()
            .select('-__v -createdAt -updatedAt')
            .populate('idRace', '-__v -createdAt -updatedAt -idPrepa')
            .populate('userList', '_id name')
            .populate('createdBy', '_id name')
        .exec();
    }

    async getPrepaById(prepaId: String): Promise<Prepa> {
        const prepa = await this.prepaModel
            .findById(prepaId)
            .select('-__v -createdAt -updatedAt')
            .populate('idRace', '-__v -createdAt -updatedAt -idPrepa')
            .populate('userList', '_id name')
            .populate('createdBy', '_id name')
        .exec();
        if(!prepa){
            throw new BadRequestException(`Prepa not found`);
        }
        return prepa;
    }

    async getPrepaByUserId(userId: String): Promise<Prepa[]> {
        const existingUser = await this.userModel.findById(userId).exec();
        if(!existingUser){
            throw new BadRequestException(`User not found`);
        }

        return this.prepaModel
            .find({ userList: userId })
            .select('-__v -createdAt -updatedAt')
            .populate('idRace', '-__v -createdAt -updatedAt -idPrepa')
            .populate('userList', '_id name')
            .populate('createdBy', '_id name')
        .exec();
    }

    async addRunnersListToPrepa(prepaId: String, userIdList: string[], logedUserId: string): Promise<Prepa> {
        if(userIdList.length === 0){
            throw new BadRequestException(`User list is empty`);
        }
        if(isValidObjectId(prepaId) === false){
            throw new BadRequestException(`Invalid prepa id`);
        }
        const prepa = await this.prepaModel.findById(prepaId).exec();
        if(!prepa){
            throw new BadRequestException(`Prepa not found`);
        }
        if(prepa.createdBy != logedUserId){
            throw new BadRequestException(`Only the creator of the prepa can add runners`);
        }
        return this.addRunnersToPrepa(prepaId, userIdList, prepa.userList);
    }

    async addLogedUserToPrepa(prepaId: String, logedUserId: string): Promise<Prepa> {
        if(isValidObjectId(prepaId) === false){
            throw new BadRequestException(`Invalid prepa id`);
        }
        const prepa = await this.prepaModel.findById(prepaId).exec();
        if(!prepa){
            throw new BadRequestException(`Prepa not found`);
        }
        return this.addRunnersToPrepa(prepaId, [logedUserId], prepa.userList);
    }
    
    async addRunnersToPrepa(prepaId: String, userIdList: string[], prepaUserList: string[]): Promise<Prepa> {

        for(const i in userIdList){
            const user = await this.userModel.findById(userIdList[i]).exec()
            if(!user){
                throw new BadRequestException(`One of the users dosn't exist`);
            }
            if (prepaUserList.map(id => id.toString()).includes(userIdList[i])) {
                throw new BadRequestException('User is already in prepa');
            }
        }
        
        const updatedPrepa = await this.prepaModel.findByIdAndUpdate(
            prepaId,
            { $push: { userList: { $each : userIdList} } },
            { new: true }
        ).exec();

        if(!updatedPrepa){
            throw new BadRequestException(`Prepa not found`);
        }
        return updatedPrepa;
    }

    async updatePrepa(prepaId: String, updatePrepaDto: UpdatePrepaDto, userId: string): Promise<Prepa> {
        const prepa = await this.prepaModel.findById(prepaId).exec();
        if(!prepa){
            throw new BadRequestException(`Prepa not found`);
        }
        if(prepa.createdBy != userId){
            throw new BadRequestException(`Only the creator of the prepa can update it`);
        }

        const updatedPrepa = await this.prepaModel.findByIdAndUpdate(
            prepaId,
            { ...updatePrepaDto },
            { new: true }
        ).exec();

        if(!updatedPrepa){
            throw new BadRequestException(`Prepa not found`);
        }
        return updatedPrepa;
    }

    async deletePrepa(prepaId: String, userId: string) {
        const prepa = await this.prepaModel.findById(prepaId).exec();
        if(!prepa){
            throw new BadRequestException(`Prepa not found`);
        }
        if(prepa.createdBy != userId){
            throw new BadRequestException(`Only the creator of the prepa can delete it`);
        }
        const deletedPrepa = await this.prepaModel.findByIdAndDelete(prepaId).exec();
        if(!deletedPrepa){
            throw new BadRequestException(`Prepa not found`);
        }
        await this.raceModel.findByIdAndUpdate(
            deletedPrepa.idRace,
            { $unset: { idPrepa: null } },
            { new: true }
        )
        await this.stepModel.deleteMany({ idPrepa: prepaId }).exec();
        
        return {message: 'Prepa deleted successfully'};
    }
    
}