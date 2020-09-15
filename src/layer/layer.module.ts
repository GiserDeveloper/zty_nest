import { Module } from '@nestjs/common';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LayerSchema } from './schema/layer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Layer', schema: LayerSchema }])],
  controllers: [LayerController],
  providers: [LayerService]
})
export class LayerModule {}
