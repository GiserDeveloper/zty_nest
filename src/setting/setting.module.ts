import { Module, forwardRef } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingSchema } from './schema/setting.schema';

import { LayerSchema } from '../layer/schema/layer.schema';
import { LayerModule } from '../layer/layer.module';

import { TeamuserSchema } from '../teamuser/schema/teamuser.schema'
import { TeamuserModule } from '../teamuser/teamuser.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Setting', schema: SettingSchema }]),
    MongooseModule.forFeature([{ name: 'Layer', schema: LayerSchema }]),
    MongooseModule.forFeature([{ name: 'TeamUser', schema: TeamuserSchema }]),
    TeamuserModule,
    LayerModule
  ],
  providers: [SettingService],
  controllers: [SettingController]
})
export class SettingModule {}
