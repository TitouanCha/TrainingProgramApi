import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RaceModule } from './race/race.module';
import { PrepaModule } from './prepa/prepa.module';
import { StepsModule } from './steps/steps.module';
import { TrainingModule } from './training/training.module';
import { Prepa, PrepaSchema } from './prepa/shemas/prepa.shema';
import { Training, TrainingSchema } from './training/shemas/training.shema';
import { Step, StepSchema } from './steps/shemas/step.shema';
import { Race, RaceSchema } from './race/schemas/race.shema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017'),
    MongooseModule.forFeature([
      { name: Prepa.name, schema: PrepaSchema },
      { name: Training.name, schema: TrainingSchema },
      { name: Step.name, schema: StepSchema },
      { name: Race.name, schema: RaceSchema}
    ]),
    AuthModule,
    UsersModule,
    RaceModule,
    PrepaModule,
    StepsModule,
    TrainingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
