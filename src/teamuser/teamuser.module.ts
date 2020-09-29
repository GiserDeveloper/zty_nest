import { Module } from '@nestjs/common';
import { TeamuserController } from './teamuser.controller';
import { TeamuserService } from './teamuser.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamuserSchema } from './schema/teamuser.schema';
import { Mongoose } from 'mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Teamuser', schema: TeamuserSchema }])],
  controllers: [TeamuserController],
  providers: [TeamuserService]
})
export class TeamuserModule {}
