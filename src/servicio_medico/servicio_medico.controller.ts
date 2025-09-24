import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ServicioMedicoService } from './servicio_medico.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { FilterServicioDto } from './dto/filter-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/guards/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('servicio-medico')
export class ServicioMedicoController {
    constructor(
        private readonly servicioService: ServicioMedicoService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    create(@Body() dto: CreateServicioDto) {
        return this.servicioService.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query() filtro: FilterServicioDto) {
        return this.servicioService.findAll(filtro);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.servicioService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    update(@Param('id') id: string, @Body() dto: UpdateServicioDto) {
        return this.servicioService.update(+id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    remove(@Param('id') id: string) {
        return this.servicioService.softDelete(+id);
    }
}
