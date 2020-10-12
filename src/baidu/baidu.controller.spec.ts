import { Test, TestingModule } from '@nestjs/testing';
import { BaiduController } from './baidu.controller';

describe('BaiduController', () => {
  let controller: BaiduController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaiduController],
    }).compile();

    controller = module.get<BaiduController>(BaiduController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
