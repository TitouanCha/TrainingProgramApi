import { ArrayNotEmpty, IsArray, isIdentityCard, IsMongoId, isMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { race } from "rxjs"
import { Race } from "src/race/schemas/race.shema"


export class PrepaDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    startDate: Date

    //@IsNotEmpty()
    //endDate: Date

    @IsNotEmpty()
    @IsMongoId()
    idRace: string

    @IsArray()
    @IsMongoId({ each: true })
    userList: string[]

    @IsString()
    @IsOptional()
    description?: string
    
}