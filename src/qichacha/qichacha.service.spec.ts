import { Test, TestingModule } from '@nestjs/testing';
import { QichachaService } from './qichacha.service';

describe('QichachaService', () => {
  let service: QichachaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QichachaService],
    }).compile();

    service = module.get<QichachaService>(QichachaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
