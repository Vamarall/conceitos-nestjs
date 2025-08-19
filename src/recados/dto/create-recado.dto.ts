import { IsNotEmpty, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateRecadoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    readonly text: string;

    @IsPositive()
    deId: number;

    @IsPositive()
    paraId: number;

}
