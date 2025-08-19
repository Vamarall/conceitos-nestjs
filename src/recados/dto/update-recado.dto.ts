import { PartialType } from "@nestjs/mapped-types";
import { CreateRecadoDto } from "./create-recado.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateReacadoDto extends PartialType(CreateRecadoDto) {
    @IsBoolean()
    @IsOptional()
    readonly lido?: boolean;
}