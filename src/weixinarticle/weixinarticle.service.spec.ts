import { Test, TestingModule } from '@nestjs/testing';
import { WeixinarticleService } from './weixinarticle.service';

describe('WeixinarticleService', () => {
  let service: WeixinarticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeixinarticleService],
    }).compile();

    service = module.get<WeixinarticleService>(WeixinarticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
