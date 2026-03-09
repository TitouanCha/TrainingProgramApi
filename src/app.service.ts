import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Prepa } from './prepa/shemas/prepa.shema';
import { Model } from 'mongoose';
import { Training } from './training/shemas/training.shema';
import { Step } from './steps/shemas/step.shema';
import { frDateTransform } from './utils/utils';
import { Race } from './race/schemas/race.shema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Prepa.name) private prepaModel: Model<Prepa>,
    @InjectModel(Training.name) private trainingModel: Model<Training>,
    @InjectModel(Step.name) private stepModel: Model<Step>,
    @InjectModel(Race.name) private raceModel: Model<Race>
  ){}

  async getUserTraining(interval: string[], userId: string){
    const startDate = frDateTransform(interval[0])
    const endDate = frDateTransform(interval[1])

    const prepas = await this.prepaModel.find({
        startDate: { $lte: endDate},
        endDate: { $gt: startDate}
      })
      .select('-__v -updatedAt')
      .populate('userList', '_id name')
      .populate('createdBy', '_id name')
    .exec()

    const steps = await this.stepModel.find({
        startDate: { $lte: endDate},
        endDate: { $gt: startDate}
      })
      .select('-__v -updatedAt')
      .populate('createdBy', '_id name')
    .exec()

    const trainings = await this.trainingModel.find({
        startDate: { $lte: endDate},
        endDate: { $gt: startDate}
      })
      .select('-__v -updatedAt')
      .populate('createdBy', '_id name')
    .exec()

    const races = await this.raceModel.find({
        startDate: { $lte: endDate},
        endDate: { $gt: startDate}
      })
      .select('-__v -updatedAt')
      .populate('createdBy', '_id name')
    .exec()

    return {
      prepas : prepas,
      steps: steps,
      training: trainings,
      race: races
    }
  }

  getHello(): string {
    return 'Hello World !!!';
  }

}
