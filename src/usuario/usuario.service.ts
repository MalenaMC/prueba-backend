import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>
    ) {}

    async create(dto: CreateUsuarioDto) {
        if (dto.email) {
            const existente = await this.usuarioRepo.findOne({
                where: { email: dto.email }
            })
        
            if (existente) {
                throw new ConflictException('Correo electronico ya registrado');
            }
        }

        const contrasenaCifrada = await bcrypt.hash(dto.contrasena, 10);

        const usuario = this.usuarioRepo.create({
            ...dto,
            contrasena: contrasenaCifrada
        });

        const usuarioGuardado = await this.usuarioRepo.save(usuario);
        delete (usuarioGuardado as any).contrasena;
        return usuarioGuardado;
    }
}
