import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { RaceType } from "../enums/race-type.enum";
import { Double } from "mongoose";
import { frDateTransform } from "src/utils/utils";

export class CreateRaceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsEnum(RaceType)
    @IsNotEmpty()
    type: RaceType;

    @IsNumber()
    @IsNotEmpty()
    distance: number;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsOptional()
    goal?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    result?: string;

    @IsString()
    @IsOptional()
    idPrepa?: string;
}