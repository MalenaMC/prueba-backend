import { Test, TestingModule } from '@nestjs/testing';
import { ServicioMedicoController } from './servicio_medico.controller';

describe('ServicioMedicoController', () => {
  let controller: ServicioMedicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicioMedicoController],
    }).compile();

    controller = module.get<ServicioMedicoController>(ServicioMedicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
