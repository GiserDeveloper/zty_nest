import { Test, TestingModule } from '@nestjs/testing';
import { QichachaController } from './qichacha.controller';

describe('QichachaController', () => {
  let controller: QichachaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QichachaController],
    }).compile();

    controller = module.get<QichachaController>(QichachaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
