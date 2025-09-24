import { IsDateString } from "class-validator";

export class FilterServicioDto {
    @IsDateString()
    fechaDesde: string;

    @IsDateString()
    fechaHasta: string;
}