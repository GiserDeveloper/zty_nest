import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SettingSchema } from './schema/setting.schema';
import { SettingDto } from './dto/setting.dto';

@Injectable()
export class SettingService {
    constructor(@InjectModel('Setting') private settingModel) {}

    async create(settingDto: SettingDto) {
        const createdSetting = new this.settingModel(settingDto);
        return await createdSetting.save();
    }

}
