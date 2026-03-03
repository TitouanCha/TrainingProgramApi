import { PartialType } from "@nestjs/mapped-types";
import { StepDto } from "./step.dto";


export class UpdateStepDto extends PartialType(StepDto) {}