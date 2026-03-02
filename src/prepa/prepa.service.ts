import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Prepa } from "./shemas/prepa.shema";
import { isValidObjectId, Model } from "mongoose";
import { PrepaDto } from "./dto/prepa.dto";
import { Race } from "src/race/schemas/race.shema";
import { User } from "src/users/schemas/user.schema";


@Injectable()
export class PrepaService {
    constructor( 
        @InjectModel(Prepa.name) private prepaModel: Model<Prepa>,
        @InjectModel(Race.name) private raceModel: Model<Race>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async createPrepa(prepaDto: PrepaDto): Promise<Prepa> {
        const raceId = prepaDto.idRace;
        const race = await this.raceModel.findById(raceId).exec();
        if(!race){
            throw new BadRequestException(`Race not found`);
        }
        const newPrepa = new this.prepaModel(prepaDto);
        const savedPrepa = await newPrepa.save();

        const prepa = await this.prepaModel
            .findById(savedPrepa._id)
            .populate('idRace')
            .populate('userList')
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
        return this.prepaModel.find().populate('idRace').populate('userList').exec();
    }

    async getPrepaById(prepaId: String): Promise<Prepa> {
        const prepa = await this.prepaModel
            .findById(prepaId)
            .populate('idRace')
            .populate('userList')
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
            .populate('idRace')
            .populate('userList', '_id name') 
            .exec();
    }
    
    async addRunnersToPrepa(prepaId: String, userIdList: string[]): Promise<Prepa> {
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
        for(const i in userIdList){
            const user = await this.userModel.findById(userIdList[i]).exec()
            if(!user){
                throw new BadRequestException(`One of the users dosn't exist`);
            }
            if (prepa.userList.map(id => id.toString()).includes(userIdList[i])) {
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


}