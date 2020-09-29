import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingSchema } from './schema/setting.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Setting', schema: SettingSchema }])],
  providers: [SettingService],
  controllers: [SettingController]
})
export class SettingModule {}
