import { Module } from '@nestjs/common';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LayerSchema } from './schema/layer.schema';

import { MarkerSchema } from '../marker/schema/marker.schema';
import { MarkerModule } from '../marker/marker.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Layer', schema: LayerSchema }]),
    MongooseModule.forFeature([{ name: 'Marker', schema: MarkerSchema }])
  ],
  controllers: [LayerController],
  providers: [LayerService]
})
export class LayerModule {}
