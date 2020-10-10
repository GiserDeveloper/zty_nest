import { Test, TestingModule } from '@nestjs/testing';
import { WeixinarticleController } from './weixinarticle.controller';

describe('WeixinarticleController', () => {
  let controller: WeixinarticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeixinarticleController],
    }).compile();

    controller = module.get<WeixinarticleController>(WeixinarticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
