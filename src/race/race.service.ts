import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RaceSchema, Race} from "./schemas/race.shema";
import { Model } from "mongoose";
import { CreateRaceDto } from "./dto/create-race.dto";
import { UpdateRaceDto } from "./dto/update-race.dto";
import path from "path";
import { Prepa } from "src/prepa/shemas/prepa.shema";
import { Step } from "src/steps/shemas/step.shema";
import { frDateTransform } from "src/utils/utils";


@Injectable()
export class RaceService {
    constructor(
        @InjectModel(Race.name) private raceModel: Model<Race>,
        @InjectModel(Prepa.name) private prepaModel: Model<Prepa>,
        @InjectModel(Step.name) private stepModel: Model<Step>
    ) {}

    async createRace(createRaceDto: CreateRaceDto, userId: string): Promise<Race>{
        const existingRce = await this.raceModel.findOne({ name: createRaceDto.name }).exec();
        if(existingRce){
            throw new BadRequestException(`Race with name ${createRaceDto.name} already exists`);
        }
        const date: Date = frDateTransform(createRaceDto.date)
        const newRace = new this.raceModel({
            ...createRaceDto,
            date: date,
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

    async updateRace(raceId: String, updatedRaceDto: UpdateRaceDto, userId: string): Promise<Race> {
        const race = await this.raceModel.findById(raceId).exec();
        if(race && race.createdBy.toString() !== userId){
            throw new UnauthorizedException('Only the creator can update the race');
        }
        var updatedRace
        if (updatedRaceDto.date) {
            const date = frDateTransform(updatedRaceDto.date);
            updatedRace = await this.raceModel.findByIdAndUpdate(
                raceId,
                {
                    $set: updatedRaceDto,
                    date: date
                },
                { new: true }
            ).exec()
        }else{
            updatedRace = await this.raceModel.findByIdAndUpdate(
                raceId,
                { $set: updatedRaceDto },
                { new: true }
            ).exec()
        }

        if(!updatedRace){
            throw new NotFoundException(`Race not found`);
        }

        return updatedRace;
    }

    async deleteRace(raceId: String, userId: string) {
        const race = await this.raceModel.findById(raceId).exec();
        if(race && race.createdBy.toString() !== userId){
            throw new UnauthorizedException('Only the creator can update the race');
        }
        const deletedRace = await this.raceModel.findByIdAndDelete(raceId).exec();
        if(!deletedRace){
            throw new NotFoundException(`Race not found`);
        }
        const deletedPrepa = await this.prepaModel.findOneAndDelete({ idRace: raceId }).exec();
        if(deletedPrepa){
            await this.stepModel.deleteMany({ idPrepa: deletedPrepa._id }).exec();
        }
        return { message: 'Prepa deleted successfully' }
    }
}