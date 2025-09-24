import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class CreateServicioDto {
    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsPositive()
    costo: number;

    @IsNumber()
    @IsPositive()
    duracion: number;

    @IsDateString()
    fechaApertura: string;

    @IsNumber()
    @IsNotEmpty()
    usuarioId: string;
}