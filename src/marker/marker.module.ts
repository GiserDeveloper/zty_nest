import { Module } from '@nestjs/common';
import { MarkerController } from './marker.controller';
import { MarkerService } from './marker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkerSchema } from './schema/marker.schema';

import { CounterSchema } from '../counter/schema/counter.schema';
import { CounterModule } from 'src/counter/counter.module';

import { LayerSchema } from '../layer/schema/layer.schema';
import { LayerModule } from '../layer/layer.module';

import { MapSchema } from '../map/schema/map.schema';
import { MapModule } from '../map/map.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Marker', schema: MarkerSchema }]),
    MongooseModule.forFeature([{ name: 'Counter', schema: CounterSchema }]),
    MongooseModule.forFeature([{ name: 'Layer', schema: LayerSchema }]),
    MongooseModule.forFeature([{ name: 'Map', schema: MapSchema }]),
    LayerModule,
    MapModule,
    CounterModule
  ],
  controllers: [MarkerController],
  providers: [MarkerService]
})
export class MarkerModule {}
