import { PartialType } from "@nestjs/mapped-types";
import { CreateRecadoDto } from "./create-recado.dto";

export class UpdateReacadoDto extends PartialType(CreateRecadoDto) {
}