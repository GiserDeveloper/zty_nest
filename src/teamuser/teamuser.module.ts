import { Module } from '@nestjs/common';
import { TeamuserController } from './teamuser.controller';
import { TeamuserService } from './teamuser.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamuserSchema } from './schema/teamuser.schema';
import { Mongoose } from 'mongoose';

import { TeamSchema } from '../team/schema/team.schema'
import { TeamModule } from '../team/team.module'

import { MapSchema } from '../map/schema/map.schema';
import { MapModule } from '../map/map.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teamuser', schema: TeamuserSchema }]),
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]),
    MongooseModule.forFeature([{ name: 'Map', schema: MapSchema }]),
    MapModule,
    TeamModule
  ],
  controllers: [TeamuserController],
  providers: [TeamuserService]
})
export class TeamuserModule {}
