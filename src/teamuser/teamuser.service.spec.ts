import { Test, TestingModule } from '@nestjs/testing';
import { TeamuserService } from './teamuser.service';

describe('TeamuserService', () => {
  let service: TeamuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamuserService],
    }).compile();

    service = module.get<TeamuserService>(TeamuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
