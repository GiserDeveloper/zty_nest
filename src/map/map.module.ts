import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MapSchema } from './schema/map.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Map', schema: MapSchema }])],
  controllers: [MapController],
  providers: [MapService]
})
export class MapModule {}
