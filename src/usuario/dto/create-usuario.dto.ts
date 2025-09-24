import { IsEmail, IsIn, IsString, IsStrongPassword } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    contrasena: string;

    @IsIn(['administrador', 'cliente'])
    rol: string;

    @IsIn(['activo', 'inactivo'])
    estado: string;
}