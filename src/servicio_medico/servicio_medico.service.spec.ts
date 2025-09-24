import { Test, TestingModule } from '@nestjs/testing';
import { ServicioMedicoService } from './servicio_medico.service';

describe('ServicioMedicoService', () => {
  let service: ServicioMedicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicioMedicoService],
    }).compile();

    service = module.get<ServicioMedicoService>(ServicioMedicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
