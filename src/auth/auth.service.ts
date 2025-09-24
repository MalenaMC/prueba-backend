import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        private readonly jwtService: JwtService
    ) {}

    async login(dto: LoginDto) {
        const {email, contrasena} = dto;

        const usuarioEncontrado = await this.usuarioRepo.findOne({
            where: {email}
        });

        if (!usuarioEncontrado) {
            throw new UnauthorizedException('Usuario no registrado');
        }

        const coincide = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
        if (!coincide) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const payload = {
            id: usuarioEncontrado.id,
            email: usuarioEncontrado.email,
            rol: usuarioEncontrado.rol
        };
        
        return {
            access_token: this.jwtService.sign(payload),
            usuario: {id: usuarioEncontrado.id, email: usuarioEncontrado.email, rol: usuarioEncontrado.rol}
        }
    }
}
