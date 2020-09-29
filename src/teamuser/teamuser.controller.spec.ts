import { Test, TestingModule } from '@nestjs/testing';
import { TeamuserController } from './teamuser.controller';

describe('Teamuser Controller', () => {
  let controller: TeamuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamuserController],
    }).compile();

    controller = module.get<TeamuserController>(TeamuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
