import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MapSchema } from './schema/map.schema';

import { LayerService } from '../layer/layer.service'
import { SettingService } from '../setting/setting.service'
import { MarkerService} from '../marker/marker.service'

import { MarkerSchema } from '../marker/schema/marker.schema';
import { LayerSchema } from '../layer/schema/layer.schema';
import { SettingSchema } from '../setting/schema/setting.schema';
import { TeamuserSchema } from '../teamuser/schema/teamuser.schema'
import { CounterSchema } from '../counter/schema/counter.schema';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Map', schema: MapSchema }]),
    MongooseModule.forFeature([{ name: 'Layer', schema: LayerSchema }]),
    MongooseModule.forFeature([{ name: 'Marker', schema: MarkerSchema }]),
    MongooseModule.forFeature([{ name: 'Setting', schema: SettingSchema }]),
    MongooseModule.forFeature([{ name: 'TeamUser', schema: TeamuserSchema }]),
    MongooseModule.forFeature([{ name: 'Counter', schema: CounterSchema }]),
  ],
  controllers: [MapController],
  providers: [MapService,LayerService,SettingService,MarkerService]
})
export class MapModule {}
