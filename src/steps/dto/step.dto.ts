import { IsEmpty, IsMongoId, IsNotEmpty, IsString } from "class-validator";


export class StepDto {

    @IsMongoId()
    @IsNotEmpty()
    idPrepa: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    startDate: string;

    @IsNotEmpty()
    @IsString()
    endDate: string;
}