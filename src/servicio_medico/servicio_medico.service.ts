import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioMedico } from './entities/servicio_medico.entity';
import { Repository } from 'typeorm';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { FilterServicioDto } from './dto/filter-servicio.dto';

@Injectable()
export class ServicioMedicoService {
    constructor(
        @InjectRepository(ServicioMedico)
        private readonly servicioRepo: Repository<ServicioMedico>
    ) {}

    async create(dto: CreateServicioDto) {
        const servicio = this.servicioRepo.create(dto);
        return await this.servicioRepo.save(servicio);
    }

    async findAll(filtrado: FilterServicioDto) {
        const consulta = this.servicioRepo.createQueryBuilder('servicio')
        .where('servicio.deletedAt IS NULL');

        if (filtrado.fechaDesde && filtrado.fechaHasta) {
            consulta.andWhere('servicio.fechaApertura BETWEEN :inicio AND :fin', {
                inicio: filtrado.fechaDesde,
                fin: filtrado.fechaHasta
            })
        } else if (filtrado.fechaDesde) {
            consulta.andWhere('servicio.fechaApertura >= :inicio', {
                inicio: filtrado.fechaDesde
            })
        } else if (filtrado.fechaHasta) {
            consulta.andWhere('servicio.fechaApertura <= :fin', {
                fin: filtrado.fechaHasta
            })
        }

        return consulta.getMany();
    }

    async findOne(id: number) {
        const servicio = await this.servicioRepo.findOneBy({ id });
        
        if (!servicio) 
        {
            throw new NotFoundException('Servicio no encontrado');
        }

        return servicio;
    }

    async update(id: number, dto: UpdateServicioDto) {
        const servicio = await this.servicioRepo.findOneBy({ id });

        if (!servicio) {
            throw new NotFoundException('Servicio no encontrado');
        }

        const actualizado = Object.assign(servicio, dto);
        return await this.servicioRepo.save(actualizado)
    }

    async softDelete(id: number) {
        const servicio = await this.servicioRepo.softDelete(id);
        
        if (servicio.affected === 0) {
            throw new NotFoundException('Servicio no encontrado');
        }

        return { message: 'Servicio medico eliminado' }
    }
}
