import { Module } from '@nestjs/common';
import { MarkerController } from './marker.controller';
import { MarkerService } from './marker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkerSchema } from './schema/marker.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Marker', schema: MarkerSchema }])],
  controllers: [MarkerController],
  providers: [MarkerService]
})
export class MarkerModule {}
