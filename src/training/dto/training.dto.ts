import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class TrainingDto{
    @IsNotEmpty()
    @IsString()
    startDate: string;

    @IsNotEmpty()
    @IsString()
    endDate: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}