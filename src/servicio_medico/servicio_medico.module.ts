import { Module } from '@nestjs/common';
import { ServicioMedicoService } from './servicio_medico.service';
import { ServicioMedicoController } from './servicio_medico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioMedico } from './entities/servicio_medico.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ServicioMedico,
    Usuario
  ])],
  providers: [ServicioMedicoService],
  controllers: [ServicioMedicoController]
})
export class ServicioMedicoModule {}
