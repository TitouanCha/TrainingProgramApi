import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RaceSchema, Race} from "./schemas/race.shema";
import { Model } from "mongoose";
import { CreateRaceDto } from "./dto/create-race.dto";
import { UpdateRaceDto } from "./dto/update-race.dto";
import path from "path";


@Injectable()
export class RaceService {
    constructor(@InjectModel(Race.name) private raceModel: Model<Race>) {}

    async createRace(createRaceDto: CreateRaceDto, userId: string): Promise<Race>{
        const existingRce = await this.raceModel.findOne({ name: createRaceDto.name }).exec();
        if(existingRce){
            throw new BadRequestException(`Race with name ${createRaceDto.name} already exists`);
        }
        const newRace = new this.raceModel({
            ...createRaceDto,
            createdBy: userId
        });
        return newRace.save();
    }

    async getAllRaces(): Promise<Race[]> {
        return this.raceModel
            .find()
            .populate({
                path: 'idPrepa', 
                select: 'name startDate',
                populate: {
                    path: 'userList',
                    select: '_id name'
                }
            })
            .populate('createdBy', '_id name')
        .exec();
    }

    async getRaceById(raceId: String): Promise<Race> {
        const race = await this.raceModel
            .findById(raceId)
            .populate({
                path: 'idPrepa', 
                select: 'name startDate',
                populate: {
                    path: 'userList',
                    select: '_id name'
                }
            })
            .populate('createdBy', '_id name')
        .exec();
        
        if(!race){
            throw new BadRequestException("Race not found")
        }
        return race
    }

    async updateRace(raceId: String, updatedRaceDto: UpdateRaceDto): Promise<Race> {
        const updatedRace = await this.raceModel.findByIdAndUpdate(
            raceId,
            { $set: updatedRaceDto },
            { new: true }
        ).exec();

        if(!updatedRace){
            throw new NotFoundException(`Race not found`);
        }

        return updatedRace;
    }
}