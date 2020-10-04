import { Module, forwardRef } from '@nestjs/common';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LayerSchema } from './schema/layer.schema';

import { MarkerSchema } from '../marker/schema/marker.schema';
import { MarkerModule } from '../marker/marker.module';

import { TeamuserSchema } from '../teamuser/schema/teamuser.schema'
import { TeamuserModule } from '../teamuser/teamuser.module'




@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Layer', schema: LayerSchema }]),
    MongooseModule.forFeature([{ name: 'Marker', schema: MarkerSchema }]),
    // MongooseModule.forFeature([{ name: 'Setting', schema: SettingSchema }]),
    MongooseModule.forFeature([{ name: 'TeamUser', schema: TeamuserSchema }]),
    TeamuserModule
  ],
  controllers: [LayerController],
  providers: [LayerService]
})
export class LayerModule {
}
