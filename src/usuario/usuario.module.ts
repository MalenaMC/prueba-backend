import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { ServicioMedico } from 'src/servicio_medico/entities/servicio_medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
      Usuario,
      ServicioMedico
    ])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
